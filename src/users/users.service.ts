import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}
        
    async findOneOrFail(
        where: FindOptionsWhere<User>
    ) {
        try {
            return await this.usersRepository.findOneByOrFail(where)
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateUserDto) {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }
}
