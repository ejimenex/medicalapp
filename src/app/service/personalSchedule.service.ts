import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { PersonalScheduleModel } from '../model/personalSchedule.model';

@Injectable()
export class PersonalScheduleService extends BaseService<PersonalScheduleModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.personalSchedule);
  }
  getByDoctor(doctor:string,date:string){
    let url=environment.url + endpoint.personalSchedule+`/getByDoctor/${doctor}/${date}`;
   return this._httpClient.get<PersonalScheduleModel[]>(url);
  }

}
