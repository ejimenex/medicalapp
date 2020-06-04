import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { AnalysisDoctorModel } from '../model/analysisDoctor';

@Injectable()
export class AnalysisDoctorService extends BaseService<AnalysisDoctorModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.analysisDoctor);
  }
  getFiltered(param:string,pageNumber:number,guid:string){
    let url= environment.url + endpoint.analysisDoctor+`/GetAnalysisPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}&doctorGuid=${guid}`
    return this._httpClient.get<any>(url)
  }
  getFilteredByDoctor(doctorId:string){
    let url= environment.url + endpoint.analysisDoctor+`/GetByDoctor?doctorGuid=${doctorId}`
    return this._httpClient.get<any>(url,this.httpOptions)
  }
}
