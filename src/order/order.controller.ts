import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, GetUser } from '../auth/decorators';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../auth/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.orderService.create(createOrderDto, user);
  }

  @Auth()
  @Get()
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.orderService.findAll(paginationDto, user);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.orderService.findOne(id, user);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @GetUser() user: User) {
    return this.orderService.update(id, updateOrderDto, user);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.orderService.remove(id, user);
  }
}
