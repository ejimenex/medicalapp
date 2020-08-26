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
import { HttpEventType, HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { endpoint } from "../../../constant/endpoind";
import { environment } from '../../../../environments/environment';

@Component({
  selector: "file-app",
  templateUrl: "./files.create.component.html",
})


export class FileComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  id: number;
  consultationId: number;
  public progress: number;
  patient:string
  public message: string;
  public httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*'
  })
}
  constructor(
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    //private patientService: PatientService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    //this.getOne(this.id);
  }
 
  upload(files) {
    
    if (!files) return;
    
    let doctorGuid = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
    const formData = new FormData();
    formData.append("doctorGuid", doctorGuid);
    formData.append("patient", this.patient);
    formData.append("consultationId", this.consultationId.toString());
    for (const file of files) {
      formData.append("file", file);
    }

    const uploadReq = new HttpRequest("POST", environment.url+ endpoint.medicalFile, formData, {
      reportProgress: true
    });
    this.http.request(uploadReq).subscribe((event) => {
     this.close()
     this.alertService.successSWA(this.translate.instant("filesUploadFiles"));
    },error=> {
      this.alertService.errorSWA('Error al subir archivos')});
  }
  close() {
    this.activeModal.close();
  }
}
