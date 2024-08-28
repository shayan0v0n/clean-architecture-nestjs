import { ApiProperty } from "@nestjs/swagger";

export class CreateResDto {
    @ApiProperty()
    id: number;
}