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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  userId: number=0;
  constructor(protected _httpClient: HttpClient, private _baseUrl: string) {
    if(JSON.parse(localStorage.getItem("currentUser"))) this.userId = JSON.parse(localStorage.getItem("currentUser")).id;
  }

  getAll(initialLoad: boolean, filter: any, page: number): Observable<TEntity[]> {
    

    if(filter.orderBy)
     filter.orderBy=` &$orderby=${filter.orderBy} desc`
     else filter.orderBy= ''

    if (!initialLoad) {
      
      let url = this.baseUrl + `?$top=10&$skip=${page}&$filter=contains(${filter.field},'${filter.value}') eq true ${filter.orderBy}`
      return this._httpClient.get<TEntity[]>(url);
    }
    return this._httpClient.get<TEntity[]>(this.baseUrl + '?$top=10&$skip=0 '+ filter.orderBy);

  }

  get(): Observable<TEntity[]> {

    return this._httpClient.get<TEntity[]>(this.baseUrl);

  }
  getById(id: TKey): Observable<TEntity> {
    return this._httpClient.get<TEntity>(this.baseUrl + '/' + id);
  }

  post(entity: TEntity): Observable<Object> {
    entity['createBy']=this.userId;
    return this._httpClient.post(this.baseUrl, entity, this.httpOptions);
  }

  patch(entity: TEntity, id: TKey): Observable<Object> {
    entity['modifiedBy']=this.userId;
    return this._httpClient
      .patch(this.baseUrl + id, entity);
  }

  put(id: TKey, entity: TEntity, ): Observable<Object> {
    entity['modifiedBy']=this.userId;
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
