import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { Account } from '../model/account';

@Injectable()
export class AccountService extends BaseService<Account, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.account);
  }


}
