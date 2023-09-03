import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  description?: string | null 
}
