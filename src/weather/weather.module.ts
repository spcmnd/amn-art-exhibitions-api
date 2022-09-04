import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
