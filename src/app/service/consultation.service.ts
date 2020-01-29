import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { ConsultationModel } from '../model/consultation.model';

@Injectable()
export class ConsultationService extends BaseService<ConsultationModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.consultation);
  }


}
