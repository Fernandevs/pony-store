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

import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { FoodItem } from './entities/food-item.entity';
import { FoodItemImage } from './entities/food-item-image.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class FoodItemService {
  private readonly logger = new Logger('Food Item Service');

  constructor(
    @InjectRepository(FoodItem)
    private readonly foodItemRepository: Repository<FoodItem>,
    @InjectRepository(FoodItemImage)
    private readonly foodItemImageRepository: Repository<FoodItemImage>,
    private readonly datasource: DataSource,
  ) {
  }

  async create(createFoodItemDto: CreateFoodItemDto) {
    try {
      const { images = [], ...foodItemDetails } = createFoodItemDto;
      const foodItem = this.foodItemRepository.create({
        ...foodItemDetails,
        images: images.map((image) =>
          this.foodItemImageRepository.create({ url: image }),
        ),
      });

      await this.foodItemRepository.save(foodItem);

      return { ...foodItem };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(@Query() paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const foodItems = await this.foodItemRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return foodItems.map((foodItem) => ({
      ...foodItem,
      images: foodItem.images.map((image) => image.url),
    }));
  }

  async findOne(id: string) {
    const foodItem: FoodItem = await this.foodItemRepository.findOneBy({ id });

    if (!foodItem)
      throw new NotFoundException(`Product with id: ${id} not found`);

    return foodItem;
  }

  async findOnePlain(id: string) {
    const { images = [], ...rest } = await this.findOne(id);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateFoodItemDto: UpdateFoodItemDto) {
    const { images, ...toUpdate } = updateFoodItemDto;
    const foodItem = await this.foodItemRepository.preload(toUpdate);

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (!foodItem)
      throw new NotFoundException(`Product with id: ${id} not found`);

    try {
      if (images) {
        await queryRunner.manager.delete(FoodItemImage, { foodItem: { id } });

        foodItem.images = images.map((image) =>
          this.foodItemImageRepository.create({ url: image }),
        );
      }

      await queryRunner.manager.save(foodItem);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const foodItem = await this.findOne(id);
    await this.foodItemRepository.remove(foodItem);

    return { ...foodItem };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
