import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { RetrieveUserDto } from './dto/retrieve-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiResponse({ type: RetrieveUserDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get()
    @ApiResponse({ type: RetrieveUserDto, isArray: true })
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query('skip') skip: number | null,
      @Query('take') take: number | null
    ) {
        return await this.userService.findAll(skip, take);
    }
    
    // For older than 18 years old users
    @Get('older-than')
    @ApiResponse({ type: RetrieveUserDto, isArray: true })
    @HttpCode(HttpStatus.OK)
    async findOlderThan(@Query('age') age: number) {
        return await this.userService.findAllGreaterThanAgeOrderByName(age);
    }
}