import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { FoodItemImage } from './food-item-image.entity';
import { OrderDetail } from '../../order/entities/oder-details.entity';

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

  @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.foodItem, {
    cascade: true,
    eager: true,
  })
  orderDetails: OrderDetail;
}
