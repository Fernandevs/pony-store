import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { FoodItemService } from './food-item.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { ValidRoles } from '../auth/interfaces';
import { Auth } from '../auth/decorators';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Food Item')
@Controller('food-item')
export class FoodItemController {
  constructor(private readonly foodItemService: FoodItemService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createFoodItemDto: CreateFoodItemDto) {
    return this.foodItemService.create(createFoodItemDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.foodItemService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodItemService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateFoodItemDto: UpdateFoodItemDto,
  ) {
    return this.foodItemService.update(id, updateFoodItemDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.foodItemService.remove(id);
  }
}
