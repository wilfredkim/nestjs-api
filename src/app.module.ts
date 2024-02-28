import { Module } from '@nestjs/common';
//import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,]
})
export class AppModule { }
