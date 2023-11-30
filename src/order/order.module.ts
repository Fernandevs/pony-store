import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/oder-details.entity';
import { AuthModule } from '../auth/auth.module';
import { FoodItemModule } from '../food-item/food-item.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    AuthModule,
    FoodItemModule,
  ],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
