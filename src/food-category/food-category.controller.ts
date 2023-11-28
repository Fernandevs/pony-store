import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { FoodCategoryService } from './food-category.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Food Category')
@Controller('food-category')
export class FoodCategoryController {
  constructor(private readonly foodCategoryService: FoodCategoryService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createFoodCategoryDto: CreateFoodCategoryDto) {
    return this.foodCategoryService.create(createFoodCategoryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.foodCategoryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodCategoryService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodCategoryDto: UpdateFoodCategoryDto) {
    return this.foodCategoryService.update(id, updateFoodCategoryDto);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodCategoryService.remove(id);
  }
}
