import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { Language } from '../model/language';

@Injectable()
export class LanguageService extends BaseService<Language, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.language);
  }


}
