import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
    constructor(private readonly jwtService: JwtService) {}

    async getUserLogged(auth: String) {
        const token = auth.replace('Bearer', '');
        console.log(this.jwtService.decode(token));
    }
}