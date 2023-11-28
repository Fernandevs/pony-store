import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodCategoryService } from './food-category.service';
import { FoodCategoryController } from './food-category.controller';
import { FoodCategory } from './entities/food-category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FoodCategoryController],
  providers: [FoodCategoryService],
  imports: [TypeOrmModule.forFeature([FoodCategory]), AuthModule],
  exports: [FoodCategoryService, TypeOrmModule]
})
export class FoodCategoryModule {}
