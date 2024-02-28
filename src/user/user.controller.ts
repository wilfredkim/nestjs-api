import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UserController {

    @Get('me')
    //@UseGuards(JwtGuard)
    getMe(@GetUser() user: User) {
        return user;
    }

}
