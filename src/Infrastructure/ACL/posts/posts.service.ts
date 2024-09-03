import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { catchError, firstValueFrom } from 'rxjs';
import { CommentResDto } from "src/Domain/Dtos/ACLs/posts/commentRes.dto";
import { PostResDto } from "src/Domain/Dtos/ACLs/posts/postRes.dto";

@Injectable()
export class PostsService {
    constructor(private readonly httpService: HttpService) {}

    async GetPosts(): Promise<PostResDto[]> {
        try {
            const getPosts = await this.httpService.get<PostResDto[]>("https://jsonplaceholder.typicode.com/posts");
            const {data} = await firstValueFrom(getPosts.pipe(
                catchError(error => {
                    throw new Error(`Error fetching post: ${error.message}`);
                })
            ));

            return data;

        }catch(error) {
            throw new InternalServerErrorException('Something went wrong while fetching the post');
        }
    }

    async GetPost(id: string): Promise<PostResDto> {
        try {
            const getPosts = await this.httpService.get<PostResDto>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
            const { data, status } = await firstValueFrom(
                getPosts.pipe(
                    catchError(error => {
                        if (error.response?.status === 404) {
                            throw new NotFoundException(`Post with ID "${id}" not found`);
                        }
                        throw new Error(`Error fetching post: ${error.message}`);
                    })
                )
            );
    
            return data;
    
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Something went wrong while fetching the post');
        }
    }
    async GetPostsComments(postId: string): Promise<CommentResDto> {
        try {
            const getPosts = await this.httpService.get<CommentResDto>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            const {data} = await firstValueFrom(getPosts.pipe(
                catchError(error => {
                    if (error.response?.status === 404) {
                        throw new NotFoundException(`Post with ID "${postId}" not found`);
                    }
                    throw new Error(`Error fetching comments: ${error.message}`);
                })
            ));

            return data;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Something went wrong while fetching the comments');
        }
    }
}