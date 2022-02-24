import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                  url:'mongodb+srv://admin:golangpractice@cluster0.jcr3f.mongodb.net/socmedNestjs?retryWrites=true&w=majority'
              }
          },
      })
  }
}
