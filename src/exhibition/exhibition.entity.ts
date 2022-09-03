import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { VenueDTO } from './exhibition.types';

export interface ExhibitionEntity extends InMemoryDBEntity {
  exhibitionId: number;
  title: string;
  begindate: string;
  enddate: string;
  description: string;
  shortdescription: string;
  venue: VenueDTO;
}
