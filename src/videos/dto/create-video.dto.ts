import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator"

export class CreateVideoDto {

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string 

  @IsString()
  @IsOptional()
  description: string | null 

  // @Min(1)
  @IsNumber()
  // @IsNotEmpty()
  category_id: number 
}
