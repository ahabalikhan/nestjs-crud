import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Min, Max } from 'class-validator';

export class RetrieveUserDto {
    @ApiProperty()
    @IsInt()
    userId: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(120)
    age: number;
}