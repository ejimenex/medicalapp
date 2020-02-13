import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';

@Injectable()
export class EventTypeService extends BaseService<any, number> {

    constructor(_httpClient: HttpClient) {
        super(_httpClient, environment.url + endpoint.eventType);
    }
    getByDoctor(id: number) {
        return this._httpClient.get(environment.url + endpoint.eventType + `/getByDoctor?id=${id}`)
    }

}
