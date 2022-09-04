import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeocoderModule } from '../geocoder/geocoder.module';
import { WeatherModule } from '../weather/weather.module';
import { ExhibitionController } from './exhibition.controller';
import { ExhibitionRepository } from './exhibition.repository';
import { ExhibitionService } from './exhibition.service';

@Module({
  controllers: [ExhibitionController],
  imports: [HttpModule, ConfigModule, GeocoderModule, WeatherModule],
  providers: [ExhibitionService, ExhibitionRepository],
  exports: [ExhibitionService, ExhibitionRepository],
})
export class ExhibitionModule {}
