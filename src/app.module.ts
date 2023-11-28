import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FoodItemModule } from './food-item/food-item.module';
import { FilesModule } from './files/files.module';
import { OrderModule } from './order/order.module';
import { SeedModule } from './seed/seed.module';
import { FoodCategoryModule } from './food-category/food-category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    FoodItemModule,
    FilesModule,
    OrderModule,
    SeedModule,
    FoodCategoryModule,
  ],
})
export class AppModule {}
