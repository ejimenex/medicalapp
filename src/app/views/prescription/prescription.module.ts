import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {TranslateService} from '@ngx-translate/core';
import {PrescriptionService} from '../../service/prescription.service';
import { ListPrescripcionComponent } from './list/list-prescription.component';


@NgModule({
  imports: [
    FormsModule,
    //CountryRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  providers:[PrescriptionService],
  declarations: [ ListPrescripcionComponent ],

})
export class CountryModule { }
