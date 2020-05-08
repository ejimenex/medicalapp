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
getFiltered(param:string,pageNumber:number){
  param=param==null?'':param;
  let url= environment.url + endpoint.country+`/getCountryPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}`
  return this._httpClient.get<any>(url)
}

}
