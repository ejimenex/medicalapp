import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalProcessModel } from '../model/medicalProcess';

@Injectable()
export class MedicalProcessService extends BaseService<MedicalProcessModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalProcess);
  }
  getByDoctor(pageNumber:number,filter:any) {
    return this._httpClient.get<any>(environment.url + endpoint.medicalProcess+`/GetPaginated?pagenumber=${pageNumber}&pagesize=10&doctorId=${filter.doctorId}&toDate=${filter.dateTo}&dateFrom=${filter.dateFrom}&patientName=${filter.patientName}`,this.httpOptions)
}

}
