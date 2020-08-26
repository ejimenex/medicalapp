import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ConsultationService } from "../../service/consultation.service";
import { PrescriptionService } from "../../service/prescription.service";
import { InvoiceService } from "../../service/invoice.service";
import {PatientService} from '../../service/patient.service'
@Component({
  templateUrl: "./history.component.html",
})
export class HistoryComponent implements OnInit {
  consultationList = [];
  recetas = [];
  invoices=[]
  doctorId = null;
  filterOne = "";
  dataPageCons: any = {};
  dataPageInv: any = {};
  dataPageRec: any = {};
  pageCons: number = 1;
  pageRec: number = 1;
  pageInv: number = 1;
  patient = 0;
  filterConsultation:any={}
  patientData:any={}
  constructor(
    private translate: TranslateService,
    private router: Router,
    private prescriptionService: PrescriptionService,
    private consultationService: ConsultationService,
    private invoiceService:InvoiceService,
    private route: ActivatedRoute,
    private patientServie:PatientService
  ) {
    this.patient = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    this.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.filterConsultation.doctorGuid=JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
    this.filterConsultation.patientId=this.patient;
    this.getAllConsultation();
    this.getAllRec();
    this.getAllInvoices();
    this.patientServie.getById(this.patient).subscribe(r=> this.patientData=r)
  }
  seeInvoice(id) {
    this.router.navigate(['invoices/edit/'+id])
  }
  openEditView(id) {
    this.router.navigate(["consultation/edit/" + id]);
  }
  getAllRec( ) {
    this.prescriptionService.getByPatient(this.patient, this.doctorId, this.pageRec).subscribe(response => {

      this.recetas = response.data;
      this.dataPageRec=response
    })
  }
  changePageRec(next:boolean){
    this.pageRec=next?this.pageRec +=1:this.pageRec -=1;
    this.getAllRec()
  }
  getAllConsultation() {
    this.consultationService
      .getByDoctorandPatient( this.pageCons, this.filterConsultation)
      .subscribe((response) => {
        this.consultationList = response.data;
        this.dataPageCons = response;
      });
  }
  changePageCons(next: boolean) {
    this.pageCons = next ? (this.pageCons += 1) : (this.pageCons -= 1);
    if (this.pageCons < 0) this.pageCons = 0;
    this.getAllConsultation();
  }
  changePageInv(next:boolean){
    this.pageInv=next?this.pageInv +=1:this.pageInv -=1;
    this.getAllInvoices()
  }
  getAllInvoices() {
  let guid=  JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
    this.invoiceService
      .getFiltered('',this.pageInv,guid,this.patient)
      .subscribe((response) => {
        this.invoices = response.data;
        this.dataPageInv = response;
      });
  }
}
