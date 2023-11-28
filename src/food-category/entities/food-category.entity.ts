import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodItem } from '../../food-item/entities/food-item.entity';

@Entity('food_categories')
export class FoodCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToOne(() => FoodItem, (foodItem) => foodItem.foodCategory)
  foodItem: FoodItem;
}
