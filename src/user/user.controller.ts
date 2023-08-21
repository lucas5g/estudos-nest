import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dt";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";

// @UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data)
  }

  @Get()
  async list() {
    return this.userService.list()
  }

  @Get(':id')
  async show(@ParamId() id: number) {
    return this.userService.show(id)
  }

  @Patch(':id')
  async update(@ParamId() id:number, @Body() data: UpdateUserDto)  {
    return this.userService.update(id, data)
   }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.userService.delete(id)
  }
}