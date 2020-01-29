import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { ReasonConsultationModel } from '../model/reason-consultation.model';

@Injectable()
export class ReasonConsultationService extends BaseService<ReasonConsultationModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.reasonConsultation);
  }


}
