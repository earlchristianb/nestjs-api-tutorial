import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolveConfigFile } from 'prettier';
import { PrismaService } from './prisma.service';

@Global()
  @Module({
  imports:[ConfigModule],
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
