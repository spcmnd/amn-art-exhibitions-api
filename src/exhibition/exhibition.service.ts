import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { map, Observable } from 'rxjs';
import { ExhibitionEntity } from './exhibition.entity';
import { ExternalCurrentExhibitionsResponseDTO } from './exhibition.types';

@Injectable()
export class ExhibitionService {
  private _externalApiUrl: string;
  private _externalApiKey: string;
  private _logger: Logger;

  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
    private _exhibitionMemoryService: InMemoryDBService<ExhibitionEntity>,
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

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  public handleTenSecondsCron(): void {
    this._logger.debug('External Exhibitions API called');
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
              venue: exhibitionDTO.venue,
            };
          });
        this._exhibitionMemoryService.createMany(exhibitionEntities);
      },
    });
  }

  private dropExhibitionsMemory(): void {
    const exhibitions = this._exhibitionMemoryService.getAll();
    this._exhibitionMemoryService.deleteMany(exhibitions.map((e) => e.id));
  }
}
