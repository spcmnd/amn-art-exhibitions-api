import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { map, Observable, switchMap } from 'rxjs';
import { GeocoderService } from '../geocoder/geocoder.service';
import { WeatherService } from '../weather/weather.service';
import { WeatherForecast } from '../weather/weather.types';
import { ExhibitionEntity } from './exhibition.entity';
import { ExhibitionRepository } from './exhibition.repository';
import { ExternalCurrentExhibitionsResponseDTO } from './exhibition.types';

@Injectable()
export class ExhibitionService {
  private _externalApiUrl: string;
  private _externalApiKey: string;
  private _logger: Logger;

  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
    private _exhibitionRepository: ExhibitionRepository,
    private _geocoderService: GeocoderService,
    private _weatherService: WeatherService,
  ) {
    this._externalApiUrl = this._configService.get(
      'EXHIBITION_API_URL',
    ) as string;
    this._externalApiKey = this._configService.get(
      'EXHIBITION_API_KEY',
    ) as string;
    this._logger = new Logger(ExhibitionService.name);

    // DEMO - Initialize data
    this.updateExternalExhibitionsData();
  }

  public getExternalCurrentExhibitions(): Observable<ExternalCurrentExhibitionsResponseDTO> {
    this._logger.debug('External Exhibitions API called');

    return this._httpService
      .get(`${this._externalApiUrl}/exhibition`, {
        params: {
          status: 'current',
          fields:
            'id,title,description,shortdescription,venues,begindate,enddate',
          apikey: this._externalApiKey,
        },
      })
      .pipe(map((response) => response.data));
  }

  public getForecastFromExhibition(
    exhibition: ExhibitionEntity,
  ): Observable<WeatherForecast> {
    const venue = exhibition.venue;

    return this._geocoderService
      .getCoordinatesFromAddress(
        venue.address1,
        venue.city,
        venue.state,
        venue.zipcode,
      )
      .pipe(
        switchMap((geoCoordinates) =>
          this._weatherService.getWeatherFromGeoCoordinates(geoCoordinates),
        ),
      );
  }

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  public handleTenSecondsCron(): void {
    this.updateExternalExhibitionsData();
  }

  private updateExternalExhibitionsData(): void {
    this.dropExhibitionsMemory();
    this.getExternalCurrentExhibitions().subscribe({
      next: (data) => {
        const exhibitionDTOs = data.records;
        const exhibitionEntities: Partial<ExhibitionEntity>[] =
          exhibitionDTOs.map((exhibitionDTO) => {
            return {
              exhibitionId: exhibitionDTO.id,
              begindate: exhibitionDTO.begindate,
              description: exhibitionDTO.description,
              enddate: exhibitionDTO.enddate,
              shortdescription: exhibitionDTO.shortdescription,
              title: exhibitionDTO.title,
              venue: exhibitionDTO.venues[0],
            };
          });
        this._exhibitionRepository.createMany(exhibitionEntities);
      },
    });
  }

  private dropExhibitionsMemory(): void {
    const exhibitions = this._exhibitionRepository.getAll();
    this._exhibitionRepository.deleteMany(exhibitions.map((e) => e.id));
  }
}
