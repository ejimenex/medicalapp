import { Observable } from 'rxjs';

export interface IService<TEntity, TKey> {
  baseUrl: string;
  getAll(initialLoad:boolean,filter:any, page:number): Observable<TEntity[]>;
  get(): Observable<TEntity[]>;
  getById(id: TKey): Observable<TEntity>;
  post(entity: TEntity): Observable<Object>;
  patch(entity: TEntity, id: TKey): Observable<Object>;
  put( id: TKey, entity: TEntity): Observable<Object>
  delete(id: TKey): Observable<Object>;
  search(propertyName: string, term: string,pageSize: number): Observable<Object>;
}