import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodItem } from '../../food-item/entities/food-item.entity';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FoodItem, (foodItem) => foodItem.id)
  foodItems: FoodItem;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.id)
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
