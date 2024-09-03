import { PostsService } from './../../Application/services/posts/posts.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags("Posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    
    @Get('all')
    async getAll() {
        return await this.postsService.getAllPosts();
    }

    @Get('/:ID')
    async getOne(@Param('ID') ID: string) {
        return await this.postsService.getPost(ID);
    }

    @Get('/by-title/:title')
    async getOneByTitle(@Param('title') title: string) {
        return await this.postsService.getPostByTitle(title);
    }
}
