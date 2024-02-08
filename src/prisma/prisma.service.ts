import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
