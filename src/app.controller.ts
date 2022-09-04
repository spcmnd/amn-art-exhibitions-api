import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ExhibitionRepository } from './exhibition/exhibition.repository';
import { ExhibitionService } from './exhibition/exhibition.service';
import { WeatherForecast } from './weather/weather.types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _exhibitionRepository: ExhibitionRepository,
    private _exhibitionService: ExhibitionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-weather')
  getForecast(): Observable<WeatherForecast> {
    const exhibitions = this._exhibitionRepository.getAll();
    const firstExhibition = exhibitions[0];

    return this._exhibitionService.getForecastFromExhibition(firstExhibition);
  }
}
