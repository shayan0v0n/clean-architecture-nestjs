import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateReqDto } from 'src/Domain/Dtos/Products/CreateReq.dto';
import { CreateResDto } from 'src/Domain/Dtos/Products/CreateRes.dto';

@Controller('product')
@ApiTags("Product")
export class ProductController {
    @Get("/")
    getAll() {
        return {message: "this is something else"};
    }

    @Post() 
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: CreateResDto,
    })
    create(@Body() dto: CreateReqDto): CreateResDto {
        return {id: 1}
    }
}
