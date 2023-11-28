import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty, IsNotEmptyObject,
  IsNumber, IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { FoodCategory } from '../../food-category/entities/food-category.entity';

export class CreateFoodItemDto {
  @IsUUID()
  @IsOptional()
  id: string;

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

  @IsObject()
  @IsNotEmptyObject()
  foodCategory: FoodCategory;
}
