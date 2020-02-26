import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalService } from '../model/medicalService';

@Injectable()
export class MedicalServiceService extends BaseService<MedicalService, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalService);
  }
  getCurrency() {
    return this._httpClient.get(environment.url + endpoint.currency);
  }

}
