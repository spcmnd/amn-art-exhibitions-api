import { Controller, Get } from '@nestjs/common';
import { forkJoin, Observable } from 'rxjs';
import { WeatherForecast } from 'src/weather/weather.types';
import { ExhibitionRepository } from './exhibition.repository';
import { ExhibitionService } from './exhibition.service';

@Controller('exhibitions')
export class ExhibitionController {
  constructor(
    private _exhibitionRepository: ExhibitionRepository,
    private _exhibitionService: ExhibitionService,
  ) {}

  @Get()
  public getExhibitions(): Observable<WeatherForecast[]> {
    const exhibitions = this._exhibitionRepository.getAll();
    const weatherRequests$ = exhibitions.map((e) =>
      this._exhibitionService.getForecastFromExhibition(e),
    );

    return forkJoin([...weatherRequests$]);
  }
}
