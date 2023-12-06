import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { OrderDetail } from './oder-details.entity';
import { User } from '../../auth/entities/user.entity';
import { FoodItem } from '../../food-item/entities/food-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('float', {
    nullable: false,
  })
  total: number;

  @ManyToMany(() => FoodItem, (item) => item.orders)
  @JoinTable()
  items: FoodItem[];

  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
