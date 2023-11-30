import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { FoodItemModule } from '../food-item/food-item.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, FoodItemModule],
})
export class SeedModule {}
