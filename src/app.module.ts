import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExhibitionModule } from './exhibition/exhibition.module';

@Module({
  imports: [ConfigModule.forRoot(), ExhibitionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
