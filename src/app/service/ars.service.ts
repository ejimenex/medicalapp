import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { ArsModel } from '../model/ars';

@Injectable()
export class ArsService extends BaseService<ArsModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.ars);
  }
getByCountry(id:number){
  return this._httpClient.get(environment.url+endpoint.ars+'/getByCountry?id='+id)
}
getFiltered(param:string,pageNumber:number){
  param=param==null?'':param;
  let url= environment.url + endpoint.ars+`/GetArsPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}`
  return this._httpClient.get<any>(url)
}

}
@Injectable()
export class ArsListService extends BaseService<ArsModel, number> {
  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.arsList);
  }
}
