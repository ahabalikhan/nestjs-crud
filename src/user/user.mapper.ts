import { CreateUserDto } from './dto/create-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { User } from './entities/user.entity';

export class UserMapper {
    static toEntity(createUserDto: CreateUserDto): User {
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.age = createUserDto.age;
        return user;
    }

    static toDto(user: User): RetrieveUserDto {
        const createUserDto = new RetrieveUserDto();
        createUserDto.userId = user.userId;
        createUserDto.name = user.name;
        createUserDto.email = user.email;
        createUserDto.age = user.age;
        return createUserDto;
    }
}