import { Component, HostBinding, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-auth.component.html'
})
export class NotAuthorizedComponent  {


  constructor(private route: ActivatedRoute) {
  }


}
