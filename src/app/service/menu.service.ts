import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';

@Injectable()
export class MenuService extends BaseService<any, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.menu);
  }

}
