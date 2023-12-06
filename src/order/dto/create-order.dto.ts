import {
  IsArray,
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateFoodItemDto } from '../../food-item/dto/create-food-item.dto';

class CreateOrderDetailsDto {
  @ValidateNested()
  @Type(() => CreateFoodItemDto)
  @IsObject()
  item: CreateFoodItemDto;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFoodItemDto)
  items: CreateFoodItemDto[];

  @IsPositive()
  @IsNumber()
  total: number;
}
