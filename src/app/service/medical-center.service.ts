import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalCenter } from '../model/medicalCenter';

@Injectable()
export class MedicalCenterService extends BaseService<MedicalCenter, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalCenter);
  }

  getFiltered(param:string,pageNumber:number){
    let url= environment.url + endpoint.medicalCenter+`/GetMedicalCenterPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}`
    return this._httpClient.get<any>(url)
  }
}
