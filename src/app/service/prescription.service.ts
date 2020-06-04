import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { ArsModel } from '../model/ars';

@Injectable()
export class PrescriptionService extends BaseService<any, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.prescription);
  }
getByPatient(id:number, doctor:number, page:number){
  return this._httpClient.get<any>(environment.url+endpoint.prescription+`/GetPrescriptionbyDoctor?pagesize=10&pageNumber=${page}&param=${id}&doctorId=${doctor}`)
}

}
