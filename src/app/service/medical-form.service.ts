import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalForm } from '../model/medicalForm';

@Injectable()
export class MedicalFormService extends BaseService<MedicalForm, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalForm);
  }

  getByDoctor(id:string,pageNumber:number,param:string) {
      return this._httpClient.get<any>(environment.url + endpoint.medicalForm+`/GetMedicalQuestionPaginated?pagenumber=${pageNumber}&pagesize=10&doctorGuid=${id}&parameters=${param}`)
  }
}
