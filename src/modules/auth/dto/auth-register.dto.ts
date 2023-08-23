import { IsDateString, IsEmail, IsNumber, IsNumberString, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class AuthRegisterDto{
  
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
  @IsNumberString()
  role:number
}