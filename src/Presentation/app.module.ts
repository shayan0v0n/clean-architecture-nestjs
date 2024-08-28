import { Module } from '@nestjs/common';
import { ProductController } from './Controllers/product/product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
})
export class AppModule {}
