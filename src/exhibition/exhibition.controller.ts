import { Controller, Get } from '@nestjs/common';
import { ExhibitionEntity } from './exhibition.entity';
import { ExhibitionRepository } from './exhibition.repository';

@Controller('exhibitions')
export class ExhibitionController {
  constructor(private _exhibitionRepository: ExhibitionRepository) {}

  @Get()
  public getExhibitions(): ExhibitionEntity[] {
    return this._exhibitionRepository.getAll();
  }
}
