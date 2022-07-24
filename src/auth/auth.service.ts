import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        let user;
         try {
            user = await this.usersService.findOneOrFail({ email });
        } catch (error) {
            return null
        }

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) return null;

        return user;
    }

    async login(user) {
        const payload = { sub: user.id, email: user.email };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    async signup(userDto: CreateUserDto) {
        const user = await this.usersService.store(userDto);

        if (!user) throw new InternalServerErrorException('Ocorreu algum problema.');

        return user;
    }
}
