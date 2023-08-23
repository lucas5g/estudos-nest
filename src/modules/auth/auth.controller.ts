import { Body, Controller, Headers, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/modules/user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDto } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller('auth')
export class AuthController{

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ){}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: AuthLoginDTO){
    return this.authService.login(body.email, body.password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.userService.create(body)
  }

  @Post('forget')
  async forget(@Body() {email}: AuthForgetDTO) {
    return this.authService.forget(email)
  }

  @Post('reset')
  async reset(@Body() {password, token}: AuthResetDto){
    return this.authService.reset(password, token)
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user){
    return { user }
  }
}