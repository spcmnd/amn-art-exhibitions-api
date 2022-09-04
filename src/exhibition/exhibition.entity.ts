import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { WeatherForecast } from 'src/weather/weather.types';
import { VenueDTO } from './exhibition.types';

export interface ExhibitionEntity extends InMemoryDBEntity {
  exhibitionId: number;
  title: string;
  begindate: string;
  enddate: string;
  description: string;
  shortdescription: string;
  venue: VenueDTO;
  forecast?: WeatherForecast;
}
