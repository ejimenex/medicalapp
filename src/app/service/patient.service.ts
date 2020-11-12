import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { endpoint } from "../constant/endpoind";
import { BaseService } from "./base-service";

import { PatientModel } from "../model/patient.model";

@Injectable()
export class PatientService extends BaseService<PatientModel, number> {
  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.patient);
  }
  getByDoctor(id) {
    return this._httpClient.get(
      environment.url + endpoint.patient + "/allByDoctor?id=" + id,
      this.httpOptions
    );
  }
  getByDoctorAndName(id, name) {
    return this._httpClient.get(
      environment.url +
        endpoint.patient +
        "/byDoctorAndName?id=" +
        id +
        "&patient=" +
        name,
      this.httpOptions
    );
  }
  getFiltered(id: number, pageNumber: number, param: string) {
    return this._httpClient.get<any>(
      environment.url +
        endpoint.patient +
        `/GetPatientPaginated?pagenumber=${pageNumber}&pagesize=10&doctorId=${id}&parameters=${param}`,
      this.httpOptions
    );
  }
  getInvoice(id: number) {
    return this._httpClient.get<any>(
      environment.url +
        endpoint.patient +
        `/GetInvoiceNoFact/${id}`,
      this.httpOptions
    );
  }
}
