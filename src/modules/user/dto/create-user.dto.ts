import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Role } from "src/enums/role.enum"

export class CreateUserDto{

  @IsString()
  name: string 

  @IsEmail()
  email: string 

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minUppercase: 0,
    minSymbols: 0
  })
  password: string 
  
  @IsOptional()
  @IsDateString()
  birthAt: Date

  @IsOptional()
  @IsEnum(Role)
  role: number
}