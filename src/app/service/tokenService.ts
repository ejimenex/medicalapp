
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenService {
  constructor(public jwtHelper: JwtHelperService) { }

  public setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  public removeCurrentToken() {
    localStorage.removeItem('access_token');
  }

  public isCurrentTokenValid(): boolean {
    const token = this.jwtHelper.tokenGetter();

    return token && !this.jwtHelper.isTokenExpired();
  }

  public getUserToken(): any {
    if (!this.jwtHelper.tokenGetter()) {
      return null;
    }
    const tokenPayload = this.jwtHelper.decodeToken();
    if (!tokenPayload) {
      return null;
    }
       let user: any = {
      displayName: tokenPayload.displayName,
      roles: tokenPayload.roles,
      username: tokenPayload.username,
      unique_name: tokenPayload.unique_name
    };
    return user;
  }

  public getPermissions(): string[] {
    if (!this.jwtHelper.tokenGetter()) {
      return [];
    }
    const tokenPayload = this.jwtHelper.decodeToken();

    if (!tokenPayload) {
      return [];
    }
    const permissions = tokenPayload.Permissions as string[];
    return permissions;
  }
}
