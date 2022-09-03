import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Controller, Get } from '@nestjs/common';
import { ExhibitionEntity } from './exhibition.entity';

@Controller('exhibitions')
export class ExhibitionController {
  constructor(
    private _exhibitionMemoryService: InMemoryDBService<ExhibitionEntity>,
  ) {}

  @Get()
  public getExhibitions(): ExhibitionEntity[] {
    return this._exhibitionMemoryService.getAll();
  }
}
