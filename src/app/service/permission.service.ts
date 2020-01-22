import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class PermissionService extends BaseService<any, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.permission);
  }
getByPermssion(id:number){
    let rolId= JSON.parse(localStorage.getItem("currentUser")).rol
  return this._httpClient.get(environment.url+endpoint.permission+`/getPermision?rolid=${rolId}&permissionid=${id}`)
}

}
