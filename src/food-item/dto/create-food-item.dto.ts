import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateFoodItemDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsIn(['Bebida', 'Comida', 'Desayuno', 'Postre'])
  @IsString()
  @IsNotEmpty()
  category: string;
}
