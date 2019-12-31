import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Account } from '../../model/account';
import { AlertService } from '../../service/alert-sweet.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/tokenService';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: Account = new Account();
  constructor(private accountService: AccountService, private translate: TranslateService, private alert: AlertService, private route: Router, private tokenService: TokenService) { }
  ngOnInit() {
   if(this.verify()) this.route.navigate(['/dashboard']);
  }
  verify(): boolean {
  
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser != null && this.tokenService.isCurrentTokenValid())
      return currentUser != null && this.tokenService.isCurrentTokenValid();

  }
  login() {

    this.accountService.post(this.user).subscribe(response => {
      localStorage.setItem("currentUser", JSON.stringify(response))
      this.route.navigate(['/dashboard']);
    }, error => {
      this.alert.error(this.translate.instant(error.error))
    }
    )
  }
}
