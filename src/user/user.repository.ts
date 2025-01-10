import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findAll(skip: number | null, take: number | null): Promise<{users: User[], total: number}> {
      const [entities, total] = await this.userRepository.findAndCount({
        skip,
        take
      });
      return { users: entities, total };
    }
}