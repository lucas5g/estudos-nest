import { BadRequestException, Body, Controller, FileTypeValidator, Headers, HttpCode, MaxFileSizeValidator, ParseFilePipe, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/modules/user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDto } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) { }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.userService.create(body)
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email)
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.reset(password, token)
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { user }
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user,
    @UploadedFile(new ParseFilePipe({
      validators:[
        new FileTypeValidator({fileType: 'image/png'}),
        new MaxFileSizeValidator({maxSize: 1024 * 1000})
      ]
    }))  file: Express.Multer.File
  ) {
    // const path = __dirname
    const path = `./storage/photos/${user.id}.png`

    try {
      await this.fileService.upload(file, path)
    } catch (error) {
      throw new BadRequestException(error)
    }

    return { sucess: true }
  }

  @UseInterceptors(FileFieldsInterceptor([
    {
      name: 'photo',
      maxCount: 1
    },
    {
      name: 'documents',
      maxCount: 10
    }
  ]))
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFiles(@User() user, @UploadedFiles() files: { photo: Express.Multer.File, documents: Express.Multer.File[] }) {
    return files

  }

}