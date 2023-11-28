import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { FoodItemImage } from './food-item-image.entity';
import { OrderDetail } from '../../order/entities/oder-details.entity';
import { FoodCategory } from '../../food-category/entities/food-category.entity';

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

  @Column('money')
  price: number;

  @OneToOne(() => FoodCategory, (foodCategory) => foodCategory.foodItem)
  @JoinColumn()
  foodCategory: FoodCategory;

  @ApiProperty()
  @OneToMany(() => FoodItemImage, (foodItemImage) => foodItemImage.foodItem, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  images?: FoodItemImage[];

  @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.foodItems, {
    cascade: true,
    eager: true,
  })
  orderDetails: OrderDetail;
}
