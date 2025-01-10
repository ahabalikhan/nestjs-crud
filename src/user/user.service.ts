import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './user.mapper';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly queueService: QueueService
    ) {}

    // Method to create a new user and add a welcome message to the queue
    async create(user: CreateUserDto): Promise<RetrieveUserDto> {
        const userEntity = await this.userRepository.create(UserMapper.toEntity(user));
        await this.queueService.addMessageJob({ userId: userEntity.userId, message: 'Welcome to our platform!' });
        return UserMapper.toDto(userEntity);
    }

    // Method to find all users with pagination
    async findAll(skip: number | null, take: number | null): Promise<{records: RetrieveUserDto[], total: number}> {
        const { users, total } = await this.userRepository.findAll(skip, take);
        return {records: users.map(UserMapper.toDto), total};
    }

    async findAllGreaterThanAgeOrderByName(age: number): Promise<RetrieveUserDto[]> {
        const users = await this.userRepository.findAllGreaterThanAgeOrderByName(age);
        return users.map(UserMapper.toDto);
    }
}