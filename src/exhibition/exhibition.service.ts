import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExhibitionService {
  private _externalApiUrl: string;
  private _externalApiKey: string;
  private _logger: Logger;

  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
  ) {
    this._externalApiUrl = this._configService.get(
      'EXHIBITION_API_URL',
    ) as string;
    this._externalApiKey = this._configService.get(
      'EXHIBITION_API_KEY',
    ) as string;
    this._logger = new Logger(ExhibitionService.name);
  }

  public getExternalCurrentExhibitions(): Observable<any> {
    return this._httpService
      .get(
        `${this._externalApiUrl}/exhibition?apikey=${this._externalApiKey}&status=current`,
      )
      .pipe(map((response) => response.data));
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  public handleTenSecondsCron(): void {
    this._logger.debug('Cron called');
  }
}
