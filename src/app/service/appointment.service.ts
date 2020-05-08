import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';

import { AppointmentModel } from '../model/appointment.model';

@Injectable()
export class AppointmentService extends BaseService<AppointmentModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.appointment);
  }
  getFiltered(filter:string,page:number,id:number){
    return this._httpClient.get<any>(environment.url+endpoint.appointment+`/GetAppointmentPaginated?pagesize=10&pagenumber=${page}&parameters=${filter}&doctorId=${id}`)
  }
}



