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
// import { OrderDetail } from './entities/oder-details.entity';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { FoodItem } from '../food-item/entities/food-item.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('Order Service');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(FoodItem)
    private readonly foodItemRepository: Repository<FoodItem>,
    private readonly datasource: DataSource,
  ) {
  }

  async create(createOrderDto: CreateOrderDto, user: User) {
    console.log(createOrderDto);

    try {
      const { items, total } = createOrderDto;
      console.log('Hola, mundo');
      const order = this.orderRepository.create({
        items: items.map(
          (item) => this.foodItemRepository.create({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            category: item.category,
          }),
        ),
        total: total,
        user,
      });

      console.log(order);

      await this.orderRepository.save(order);

      console.log('Hola, mundo 3');
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
