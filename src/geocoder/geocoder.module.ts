import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeocoderService } from './geocoder.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GeocoderService],
  exports: [GeocoderService],
})
export class GeocoderModule {}
