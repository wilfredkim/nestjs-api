import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from "argon2";


import { ForbiddenException } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }



    login(authDto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: authDto.email
            }
        });
        if (!user) {
            throw new ForbiddenException("Invalid user!");

        }

        const passwordMatches = await argon2.verify(user.hash, authDto.password);
        if (!passwordMatches) {
            throw new ForbiddenException("Incorrect Credentials!");

        }
        return user;
    }


    async signup(authDto: AuthDto) {
        try {

            //generate password
            //save user
            // const argon2 = require('argon2');

            const hash = await argon2.hash(authDto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: authDto.email,
                    hash
                },
            });
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Credentials Taken",)
                } throw error;

            }
        }
    }
}