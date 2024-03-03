import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
//import { ConfigService } from '@nestjs/config';


@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://admin:Adm!n123$@localhost:5432/next_js_api_db'
                }
            }
        })
    }
    cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
