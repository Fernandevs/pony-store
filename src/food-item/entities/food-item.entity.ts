import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { FoodItemImage } from './food-item-image.entity';
// import { OrderDetail } from '../../order/entities/oder-details.entity';
import { Order } from '../../order/entities/order.entity';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('float')
  price: number;

  @Column('text')
  category: string;

  @ApiProperty()
  @OneToMany(() => FoodItemImage, (foodItemImage) => foodItemImage.foodItem, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  images?: FoodItemImage[];

  @ManyToMany(() => Order, (order) => order.items)
  orders: Order[];
}
