import { PostsService as PostsServiceACL } from './../../../Infrastructure/ACL/posts/posts.service';
import { Get, Injectable, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';

@Injectable()
export class PostsService {
    constructor(private readonly postsServiceACL: PostsServiceACL) {}

    async getAllPosts()  {
        try {
            return await this.postsServiceACL.GetPosts();
        }catch(e) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async getPost(id:string)  {
        try {
            const post = await this.postsServiceACL.GetPost(id);
            return post
        }catch(e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async getPostByTitle(title:string) {
        try {
            const posts = await this.postsServiceACL.GetPosts();
            const selectedPost = posts.find(post => post.title == title);
            console.log(!selectedPost)
            if(!selectedPost) 
                throw new NotFoundException('Post not found');
            
            return selectedPost;
        }catch(e) {
            if(e instanceof NotFoundException) {
                throw e;
            }else {
                throw new InternalServerErrorException("Something went wrong")
            }
        }
    }
}
