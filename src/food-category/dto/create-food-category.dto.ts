import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength
} from 'class-validator';

export class CreateFoodCategoryDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;
}
