import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TokenService} from './service/tokenService';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private translate:TranslateService, private tokenService:TokenService) {
    debugger
    if(!this.verify()) this.router.navigate(['/login'])
    let lang='en';
    if(localStorage.getItem("currentUser")){
    lang=JSON.parse(localStorage.getItem("currentUser")).language;   
    }
    translate.setDefaultLang(lang.toLowerCase());
   }
   verify(): boolean {
  
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser != null && this.tokenService.isCurrentTokenValid())
      return currentUser != null && this.tokenService.isCurrentTokenValid();

  }
  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
