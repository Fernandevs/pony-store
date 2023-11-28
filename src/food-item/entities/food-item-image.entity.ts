import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodItem } from './food-item.entity';

@Entity('food_item_images')
export class FoodItemImage {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => FoodItem, (foodItem) => foodItem.images, {
    onDelete: 'CASCADE',
  })
  foodItem: FoodItem;
}
