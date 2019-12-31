import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import {  Role } from '../model/language';

@Injectable()
export class RoleService extends BaseService<Role, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.role);
  }


}
