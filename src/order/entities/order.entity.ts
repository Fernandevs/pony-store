import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderDetail } from './oder-details.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('money', {
    nullable: false,
  })
  total: number;

  @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetail[];

  @OneToOne(() => User, (user) => user.order)
  user: User;
}
