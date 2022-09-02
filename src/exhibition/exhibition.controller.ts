import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExhibitionService } from './exhibition.service';

@Controller('exhibitions')
export class ExhibitionController {
  constructor(private _exhibitionService: ExhibitionService) {}

  @Get()
  public getExhibitions(): Observable<any> {
    return this._exhibitionService.getExternalCurrentExhibitions();
  }
}
