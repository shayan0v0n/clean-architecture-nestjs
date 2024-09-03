import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsModule as PostsModuleAcl } from 'src/Infrastructure/ACL/posts/posts.module';

@Module({
  imports: [PostsModuleAcl],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
