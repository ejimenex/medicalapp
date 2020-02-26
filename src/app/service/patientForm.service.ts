import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { PatientForm } from '../model/medicalForm';

@Injectable()
export class PatientFormService extends BaseService<PatientForm, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.patientForm);
  }

  getByPatient(id:string,patient:number) {
      return this._httpClient.get<PatientForm[]>(environment.url + endpoint.patientForm+`/filtered/${id}/${patient}`)
  }
}
