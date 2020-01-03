import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalSpeciality } from '../model/medical-speciality';

@Injectable()
export class MedicalSpecilityService extends BaseService<MedicalSpeciality, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalSpeciality);
  }


}
