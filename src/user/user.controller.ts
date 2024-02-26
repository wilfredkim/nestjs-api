import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    getMe() {
        return 'me'
    }
}
