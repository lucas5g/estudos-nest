import { ApiProperty } from '@nestjs/swagger'
import { Type } from "class-transformer"
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
  @Type(() => Number)
  category_id: number 
}

export class CreateVideoWithUploadDto extends CreateVideoDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
