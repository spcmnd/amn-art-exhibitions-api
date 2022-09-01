import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExhibitionService {
  constructor(private httpService: HttpService) {}
}
