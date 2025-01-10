import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './user.mapper';
import { RetrieveUserDto } from './dto/retrieve-user.dto';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async create(user: CreateUserDto): Promise<RetrieveUserDto> {
        const userEntity = await this.userRepository.create(UserMapper.toEntity(user));
        return UserMapper.toRetrieveDto(userEntity);
    }

    async findAll(skip: number | null, take: number | null): Promise<{records: RetrieveUserDto[], total: number}> {
        const { users, total } = await this.userRepository.findAll(skip, take);
        return {records: users.map(UserMapper.toRetrieveDto), total};
    }
}