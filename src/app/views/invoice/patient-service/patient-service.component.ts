import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { AlertService } from "../../../service/alert-sweet.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PatientService } from "../../../service/patient.service";
import { TranslateService } from "@ngx-translate/core";
import { config } from "../../../constant/param";

@Component({
  selector: "patient-invoice-app",
  templateUrl: "./patient.service.component.html",
})
export class PatientInvoiceComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  id: number;
  data = [];
  constructor(
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    private patientService: PatientService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.patientService.getInvoice(this.id).subscribe((response) => {
      this.data = response;
    });
  }

  onSelect(item: any, index) {
    
    this.data.splice(index, 1);
    this.notifyParent.emit(item);
    if(this.data.length==0)
     this.close()
  }
  close() {
    this.activeModal.close();
  }
}
