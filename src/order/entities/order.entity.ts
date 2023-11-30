import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.order, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  orderDetails: OrderDetail[];

  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
