import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { FoodCategory } from './entities/food-category.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class FoodCategoryService {
  private readonly logger = new Logger('Food Item Service');

  constructor(
    @InjectRepository(FoodCategory)
    private readonly foodCategoryRepository: Repository<FoodCategory>,
  ) {
  }

  async create(createFoodCategoryDto: CreateFoodCategoryDto) {
    try {
      const { name } = createFoodCategoryDto;
      const foodCategory = this.foodCategoryRepository.create({ name });

      await this.foodCategoryRepository.save(foodCategory);

      return { ...foodCategory };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(@Query() paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.foodCategoryRepository.find({
      take: limit,
      skip: offset,
      relations: {
        foodItem: true,
      },
    });
  }

  async findOne(id: string) {
    const category = this.foodCategoryRepository.findOneBy({ id });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  async update(id: string, updateFoodCategoryDto: UpdateFoodCategoryDto) {
    try {
      await this.findOne(id);
      await this.foodCategoryRepository.update(id, updateFoodCategoryDto);
      return this.foodCategoryRepository.findOneBy({ id });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.foodCategoryRepository.delete(id);

    return { ...category };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
