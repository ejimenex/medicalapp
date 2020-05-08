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
  getByDoctor(id:number,pageNumber:number,param:string,filterDate:any) {
    return this._httpClient.get<any>(environment.url + endpoint.consultation+`/GetConsultationPaginated?pagenumber=${pageNumber}&pagesize=10&doctorId=${id}&parameters=${param}&dateTo=${filterDate.dateTo}&dateFrom=${filterDate.dateFrom}`)
}

}
