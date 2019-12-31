import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { Country } from '../model/country';

@Injectable()
export class CountryService extends BaseService<Country, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.country);
  }


}
