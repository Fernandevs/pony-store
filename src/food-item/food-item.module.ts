import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodItem } from './entities/food-item.entity';
import { FoodItemImage } from './entities/food-item-image.entity';
import { FoodItemService } from './food-item.service';
import { FoodItemController } from './food-item.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FoodItemController],
  providers: [FoodItemService],
  imports: [TypeOrmModule.forFeature([FoodItem, FoodItemImage]), AuthModule],
  exports: [FoodItemService, TypeOrmModule],
})
export class FoodItemModule {}
