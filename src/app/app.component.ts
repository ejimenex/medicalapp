import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './service/tokenService';
import { slideInAnimation } from './animation/animation';
import { trigger, transition, animate, query, style } from '@angular/animations';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  //template: '[@routeAnimations]="prepareRoute(outlet)" <router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private translate: TranslateService, private tokenService: TokenService) {

    if (!this.verify()) this.router.navigate(['/login'])
    let lang = 'en';
    if (localStorage.getItem("currentUser")) {
      lang = JSON.parse(localStorage.getItem("currentUser")).language;
    }
    translate.setDefaultLang(lang.toLowerCase());

  }
  verify(): boolean {
    debugger
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser != null && this.tokenService.isCurrentTokenValid())
    return currentUser != null && this.tokenService.isCurrentTokenValid();

  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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
