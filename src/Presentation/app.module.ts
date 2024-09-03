import { Module } from '@nestjs/common';
import { ProductController } from './Controllers/product/product.controller';
import { PostsController } from './Controllers/posts/posts.controller';
import { PostsModule } from 'src/Application/services/posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [ProductController, PostsController],
})
export class AppModule {}
