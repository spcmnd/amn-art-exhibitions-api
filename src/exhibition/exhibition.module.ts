import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExhibitionController } from './exhibition.controller';
import { ExhibitionService } from './exhibition.service';

@Module({
  controllers: [ExhibitionController],
  imports: [HttpModule, ConfigModule, InMemoryDBModule],
  providers: [ExhibitionService],
})
export class ExhibitionModule {}
