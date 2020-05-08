import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { UserModel } from '../model/user';

@Injectable()
export class UserService extends BaseService<UserModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.user);
  }
  getFiltered(param:string,pageNumber:number){
    let url= environment.url + endpoint.user+`/GetUserPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}`
    return this._httpClient.get<any>(url)
  }
  getFilteredByDoctor(param:string,pageNumber:number, doctorId:number){
    let url= environment.url + endpoint.user+`/GetUserPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}&doctorId=${doctorId}`
    return this._httpClient.get<any>(url)
  }
}
