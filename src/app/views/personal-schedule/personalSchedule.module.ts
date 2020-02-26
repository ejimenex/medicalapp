import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {TranslateService, TranslateModule} from '@ngx-translate/core';
import {PersonalScheduleService} from '../../service/personalSchedule.service';
import {PatientService} from '../../service/patient.service';
import {EventTypeService} from '../../service/eventType.service';
import { PersonalScheduleComponent } from './create/create-personal-schedule.component';
import { PersonalScheduleRoutingModule } from './personal-schedule.route';
import { PersonalScheduleListComponent } from './list/list-personal-schedule.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PersonalScheduleRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    TranslateModule,
    NgbModule,
  ],
  providers:[PersonalScheduleService,EventTypeService,PatientService],
  declarations: [ PersonalScheduleComponent,PersonalScheduleListComponent ],
  entryComponents:[PersonalScheduleComponent]
})
export class PersonalScheduleModule { }
