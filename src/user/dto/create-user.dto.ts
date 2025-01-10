import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Min, Max, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
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