import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { ArsModel } from '../model/ars';

@Injectable()
export class ArsService extends BaseService<ArsModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.ars);
  }


}
