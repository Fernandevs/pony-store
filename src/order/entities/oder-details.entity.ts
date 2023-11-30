import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FoodItem } from '../../food-item/entities/food-item.entity';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FoodItem, (item) => item.orderDetails)
  foodItem: FoodItem;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @Column('smallint', {
    nullable: false,
  })
  quantity: number;

  @Column('money', {
    nullable: false,
  })
  amount: number;
}
