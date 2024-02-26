import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
    ExtractJwt,
    Strategy,
} from 'passport-jwt';
import { env } from "process";

import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,
    'jwt',) {
    constructor(private prisma: PrismaService,) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.JWT_SECRET_KEY,
        });
    }

    async validate(payload: {
        sub: number;
        email: string;
    }) {
        const user =
            await this.prisma.user.findUnique({
                where: {
                    id: payload.sub,
                },
            });
        delete user.hash;
        return user;
    }
}