import { Injectable } from '@angular/core';
import { IService } from './IService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

export class BaseService<TEntity, TKey> implements IService<TEntity, TKey> {

  protected pageZise = 5;

  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(value: string) {
    this._baseUrl = value;
  }
  public httpOptions = {
   
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${JSON.parse(localStorage.getItem("currentUser"))==null?'':JSON.parse(localStorage.getItem("currentUser")).accessToken}`
    })
  };
  userId: number = 0;
  constructor(protected _httpClient: HttpClient, private _baseUrl: string) {
    if (JSON.parse(localStorage.getItem("currentUser"))) this.userId = JSON.parse(localStorage.getItem("currentUser")).id;
  }

  getAll(initialLoad: boolean, filter: any, page: number): Observable<TEntity[]> {


    if (filter.orderBy)
      filter.orderBy = ` &$orderby=${filter.orderBy} desc`
    else filter.orderBy = ''

    if (!initialLoad) {

      let url = this.baseUrl + `?$top=10&$skip=${page}&$count=true&$filter=contains(${filter.field},'${filter.value}') eq true `
      return this._httpClient.get<TEntity[]>(url);
    }
    return this._httpClient.get<TEntity[]>(this.baseUrl + '?$top=10&$skip=0&$count=true ');

  }
 
  getBySpecifiedParam(initialLoad: boolean, filter: any, page: number, specifiedField: string): Observable<TEntity[]> {
    if (filter.orderBy)
      filter.orderBy = ` &$orderby=${filter.orderBy} desc`
    else filter.orderBy = ''

    if (!initialLoad) {

      let url = this.baseUrl + `?$top=10&$skip=${page}&$count=true&$filter=contains(${filter.field} ,'${filter.value}') and ${specifiedField} eq ${filter.specifiedField} eq true `
      return this._httpClient.get<TEntity[]>(url);
    }
    return this._httpClient.get<TEntity[]>(this.baseUrl + `?$top=10&$skip=0&$count=true&$filter=${specifiedField} eq ${filter.specifiedField} `);

  }

  getNotPaginated(filter: any, specifiedField: string): Observable<TEntity[]>{
    if (filter.orderBy)
      filter.orderBy = ` &$orderby=${filter.orderBy} desc`
    else 
    filter.orderBy = ''

    return this._httpClient.get<TEntity[]>(this.baseUrl + `?$filter=${specifiedField} eq ${filter.specifiedField} `);
  }

  get(): Observable<TEntity[]> {

    return this._httpClient.get<TEntity[]>(this.baseUrl,this.httpOptions);

  }
  getById(id: TKey): Observable<TEntity> {
    return this._httpClient.get<TEntity>(this.baseUrl + '/' + id,this.httpOptions);
  }

  post(entity: TEntity): Observable<Object> {
    entity['createBy'] = this.userId;
    return this._httpClient.post(this.baseUrl, entity, this.httpOptions);
  }

  patch(entity: TEntity, id: TKey): Observable<Object> {
    entity['modifiedBy'] = this.userId;
    return this._httpClient
      .patch(this.baseUrl + id, entity);
  }

  put(id: TKey, entity: TEntity, ): Observable<Object> {
    entity['modifiedBy'] = this.userId;
    return this._httpClient
      .put(this.baseUrl, entity);
  }

  delete(id: TKey): Observable<Object> {

    return this._httpClient.delete(this.baseUrl + '/' + id);
  }

  search(propertyName: string, term: string, pageSize: number): Observable<Object> {
    if (term === '') {
      return of([]);
    }

    let params = new HttpParams()
      .set('pagesize', `${pageSize}`)
      .set(`${propertyName}`, `${term}`)

    var data = this._httpClient.get(this.baseUrl, { params: params });
    return this.requestResolver(data);

  }


  requestResolver(request: any): Observable<TEntity[]> {

    let entity = from<TEntity[][]>(request.pipe(map(d => d["data"])))

    if (!isNullOrUndefined(entity)) {
      return entity;
    }

    return request;
  }
}
