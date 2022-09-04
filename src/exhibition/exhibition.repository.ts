import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ExhibitionEntity } from './exhibition.entity';

export class ExhibitionRepository extends InMemoryDBService<ExhibitionEntity> {}
