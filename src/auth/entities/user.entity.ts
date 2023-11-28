import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '4e5b8b2a-8692-49c1-a616-8a92726fa6f3',
    description: 'User unique ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'address@email.com',
    description: 'Email address',
    uniqueItems: true,
    nullable: false,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'A password must include an uppercase, lowercase letter and a number',
    nullable: false,
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'Test One',
    description: 'users\' full name',
    nullable: false,
  })
  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToOne(() => Order, (order) => order.user)
  order: Order;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
