import { ApiProperty } from "@nestjs/swagger";

export class CreateReqDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    label: string;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    quantity: number;
}