import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public sidebarMinimized = false;
  public navItems = navItems;
  user:string;
constructor (private _router:Router, private translate:TranslateService){    this.user=JSON.parse(localStorage.getItem("currentUser")).userName;
}
  toggleMinimize(e) {
    this.sidebarMinimized = e;


  }

  logOut(){
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
    window.location.reload();
  }
}
