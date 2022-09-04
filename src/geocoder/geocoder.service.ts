import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import {
  GeocoderLocationsAddressResponseDTO,
  GeoCoordinates,
} from './geocoder.types';

@Injectable()
export class GeocoderService {
  private _logger: Logger;
  private _geocoderApiUrl: string;

  constructor(
    private _configService: ConfigService,
    private _httpService: HttpService,
  ) {
    this._geocoderApiUrl = this._configService.get(
      'GEOCODER_API_URL',
    ) as string;
    this._logger = new Logger(GeocoderService.name);
  }

  public getCoordinatesFromAddress(
    street: string,
    city: string,
    state: string,
    zip: string,
  ): Observable<GeoCoordinates> {
    this._logger.debug('Get Coordinates From Address Call');

    this._logger.debug({
      street: street ?? undefined,
      city: city ?? undefined,
      state: state ?? undefined,
      zip: zip ?? undefined,
      benchmark: 2020,
      format: 'json',
    });

    return this._httpService
      .get<GeocoderLocationsAddressResponseDTO>(
        `${this._geocoderApiUrl}/geocoder/locations/address`,
        {
          params: {
            street: street ?? undefined,
            city: city ?? undefined,
            state: state ?? undefined,
            zip: zip ?? undefined,
            benchmark: 2020,
            format: 'json',
          },
        },
      )
      .pipe(
        map((response) => {
          const geocoderLocationsAddressResponseDTO = response.data;
          const location =
            geocoderLocationsAddressResponseDTO.result.addressMatches[0];

          return {
            lat: location.coordinates.y,
            lon: location.coordinates.x,
          };
        }),
      );
  }
}
