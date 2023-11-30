import { DataSource, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/oder-details.entity';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('Order Service');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    private readonly datasource: DataSource,
  ) {
  }

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      const { items, total } = createOrderDto;
      const order = this.orderRepository.create({
        orderDetails: items.map((orderDetail) =>
          this.orderDetailsRepository.create({
            foodItem: {
              id: orderDetail.item.id,
              name: orderDetail.item.name,
              category: orderDetail.item.category,
              description: orderDetail.item.description,
              price: orderDetail.item.price,
            },
            amount: orderDetail.amount,
            quantity: orderDetail.quantity,
          }),
        ),
        total: total,
        user,
      });

      await this.orderRepository.save(order);

      return { ...order };
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  async findAll(@Query() paginationDto: PaginationDto, user: User) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.datasource
      .getRepository(Order)
      .createQueryBuilder('orders')
      .where('orders.userId = :userId', { userId: user.id })
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async findOne(id: string, user: User) {
    const order = await this.datasource
      .getRepository(Order)
      .createQueryBuilder('orders')
      .where('id = :id', { id })
      .andWhere('orders.userId = :userId', { userId: user.id })
      .getOne();

    if (!order) throw new NotFoundException(`Order with ${id} not found`);

    console.log(order);

    return {
      ...order
    };
  }

  async removeAll() {
    const order = this.orderRepository.createQueryBuilder('order');

    try {
      return await order
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  private handleDatabaseExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
