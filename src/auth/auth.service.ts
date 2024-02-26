import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { env } from "process";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }
    async login(authDto: AuthDto) {
        const user =
            await this.prisma.user.findUnique({
                where: {
                    email: authDto.email,
                },
            });
        if (!user) {
            throw new ForbiddenException("Invalid user!");

        }

        const passwordMatches = await argon.verify(user.hash, authDto.password);
        if (!passwordMatches) {
            throw new ForbiddenException("Incorrect Credentials!");

        }
        return this.signToken(user.id, user.email);
    }


    async signup(authDto: AuthDto) {
        try {

            //generate password
            //save user
            // const argon2 = require('argon2');

            const hash = await argon.hash(authDto.password);


            const user = await this.prisma.user.create({
                data: {
                    email: authDto.email,
                    hash,
                },
            });
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Credentials Taken",)
                } throw error;

            }
        }
    }




    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };
        const secret = env.JWT_SECRET_KEY;

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            },
        );

        return {
            access_token: token,
        };
    }
}