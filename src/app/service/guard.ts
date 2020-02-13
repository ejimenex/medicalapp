import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PermissionService } from './permission.service';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private _router: Router, private _httpClient: HttpClient) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {

        const expectedPermission = route.data.expectedPermission;
        if(!JSON.parse(localStorage.getItem("currentUser"))) 
        { 
          this._router.navigate(['/login']);
        }
        let rolId= JSON.parse(localStorage.getItem("currentUser")).rol
     
        return this._httpClient.get(environment.url+endpoint.permission+`/getPermision?rolid=${rolId}&permissionid=${expectedPermission}`).pipe(
            map(res => {
              if (!res) {
            
                this._router.navigate(['not-authorized']);
                return false;
              } else {
                return true;
              }
            }),
            catchError((err) => {
              return of(false);
            })
          );
       

    }

 
}
