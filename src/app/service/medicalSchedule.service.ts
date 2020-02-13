import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalSchedule } from '../model/medicalSchedule';

@Injectable()
export class MedicalScheduleService extends BaseService<MedicalSchedule, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalSchedule);
  }
  getByDoctor(id: number) {
    return this._httpClient.get(environment.url + endpoint.medicalSchedule + '/getByDoctor?id=' + id)
  }
  getByOffice(id: number) {
    return this._httpClient.get(environment.url + endpoint.medicalSchedule + '/getByOffice?id=' + id)
  }
}
