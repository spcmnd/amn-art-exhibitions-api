import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable, switchMap } from 'rxjs';
import { GeoCoordinates } from 'src/geocoder/geocoder.types';
import {
  WeatherForecast,
  WeatherForecastResponseDTO,
  WeatherFromGeoCoordinatesResponseDTO,
} from './weather.types';

@Injectable()
export class WeatherService {
  private _logger: Logger;
  private _weatherApiUrl: string;

  constructor(
    private _configService: ConfigService,
    private _httpService: HttpService,
  ) {
    this._logger = new Logger(WeatherService.name);
    this._weatherApiUrl = this._configService.get('WEATHER_API_URL') as string;
  }

  public getWeatherFromGeoCoordinates(
    geoCoordinates: GeoCoordinates,
  ): Observable<WeatherForecast> {
    this._logger.debug('Get Weather From GeoCoordinates Call');

    return this._httpService
      .get<WeatherFromGeoCoordinatesResponseDTO>(
        `${this._weatherApiUrl}/points/${geoCoordinates.lat},${geoCoordinates.lon}`,
      )
      .pipe(
        map((response) => response.data),
        switchMap((weatherFromGeoCoordinatesResponseDTO) => {
          this._logger.debug('Get Weather From GeoCoordinates Response');
          this._logger.debug(weatherFromGeoCoordinatesResponseDTO);

          const forecastUrl =
            weatherFromGeoCoordinatesResponseDTO.properties.forecast;
          this._logger.debug('Weather Forecast Call');

          return this._httpService
            .get<WeatherForecastResponseDTO>(forecastUrl)
            .pipe(map((response) => response.data));
        }),
        map((weatherForecastResponseDTO) => {
          this._logger.debug('Weather Forecast Response');
          this._logger.debug(weatherForecastResponseDTO);

          const periods = weatherForecastResponseDTO.properties.periods;
          const todayForecast = periods.find(
            (p) => new Date(p.startTime).getDate() === new Date().getDate(),
          );
          const tomorrowForecast = periods.find(
            (p) => new Date(p.startTime).getDate() === new Date().getDate() + 1,
          );

          return {
            today: todayForecast?.shortForecast ?? 'Unknown',
            tomorrow: tomorrowForecast?.shortForecast ?? 'Unknown',
          };
        }),
      );
  }
}
