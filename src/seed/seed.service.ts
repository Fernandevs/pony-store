import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import { FoodItemService } from '../food-item/food-item.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly foodItemService: FoodItemService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertNewProducts();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.foodItemService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    seedUsers.forEach(user => {
      this.userRepository.create({ ...user });
    });

    await this.userRepository.save(seedUsers);
  }

  private async insertNewProducts() {
    await this.foodItemService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach(product => {
      insertPromises.push(this.foodItemService.create({ ...product }));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
