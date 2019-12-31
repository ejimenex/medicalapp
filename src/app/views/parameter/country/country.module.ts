import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {TranslateService} from '@ngx-translate/core';
import { CountryListComponent } from './list/country-list.component';
import { CountryRoutingModule } from './country-routing.module';


@NgModule({
  imports: [
    FormsModule,
    //CountryRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ CountryListComponent ],

})
export class CountryModule { }
