import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertToast } from '../../../../service/alert-toast.service';
import { AlertService } from '../../../../service/alert-sweet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicalFormService } from '../../../../service/medical-form.service';
import { LanguageService } from '../../../../service/language.service';
import { MedicalForm } from '../../../../model/medicalForm';


@Component({
    templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent implements OnInit {

    model: MedicalForm = new MedicalForm();
    types = [];
    id = 0;
    constructor(private translate: TranslateService, private alert: AlertToast,
        private router: Router,private route: ActivatedRoute, private alertService: AlertService,
       
        private langService: LanguageService,
        private medicalFormService: MedicalFormService) {

    }
    ngOnInit() {
        this.model.doctorGuid = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.id =parseInt(this.route.snapshot.paramMap.get('id') )
     
        this.getTypes();
        if (this.id) {
            this.getData();
        }
    }

    async getTypes() {
        this.types = [{id:'text',value:this.translate.instant('text')},
        {id:'number',value:this.translate.instant('number')},
        {id:'date',value:this.translate.instant('date')}]
    }
    async getData() {
        this.model = await this.medicalFormService.getById(this.id).toPromise() as any;
    }
    save(){
        if(this.id) this.edit()
        else this.add();
    }
    add() {

        if (!this.model.question || !this.model.type)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.medicalFormService.post(this.model).subscribe(response => {

            this.router.navigate(['parameter/medical-question'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {

            this.alertService.error(this.translate.instant(error.error))
        })

    }
    edit() {

        if (!this.model.question || !this.model.type)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.medicalFormService.put(this.id,this.model).subscribe(response => {

            this.router.navigate(['parameter/medical-question'])
            this.alertService.success(this.translate.instant("sucessEdition"))
        }, error => {

            this.alertService.error(this.translate.instant(error.error))
        })

    }
}
