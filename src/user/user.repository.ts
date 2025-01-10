import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    // Method to create a new user
    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    // Method to find all users with pagination
    async findAll(skip: number | null, take: number | null): Promise<{users: User[], total: number}> {
      const [entities, total] = await this.userRepository.findAndCount({
        skip,
        take
      });
      return { users: entities, total };
    }

    // Method to find all users older than a certain age, ordered by name
    async findAllGreaterThanAgeOrderByName(age: number): Promise<User[]> {
        return await this.userRepository.find({
            where: {
                age: MoreThan(age)
            },
            order: {
                name: 'ASC'
            }
        });
    }
}