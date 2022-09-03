import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExhibitionModule } from './exhibition/exhibition.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ExhibitionModule,
    ScheduleModule.forRoot(),
    InMemoryDBModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
