import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { DoctorModel } from '../../../../model/doctor';
import { Router } from '@angular/router';
import { MedicalSpecilityService } from '../../../../service/medicalSpeciality.service';
import { CountryService } from '../../../../service/country.service';
import { DoctorService } from '../../../../service/doctor.service';
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../../service/language.service';


@Component({
  templateUrl: './doctor-create.component.html'
})
export class DoctorAddComponent implements OnInit {

  doctor: DoctorModel = new DoctorModel();
  usersData = this.doctor.users;
  sexList = [];
  treament = [];
  spelcialties = [];
  lang = [];
  countries = [];
  nationalities = [];
  selectedCliente = {};
  selectedCountry = {};
  selectedNationality = {};
  isSpelciatiesNotSelected: boolean = true;

  constructor(private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private langService: LanguageService,
    private medicalSpecialitityService: MedicalSpecilityService,
    private doctorService: DoctorService,
    private countryService: CountryService) {
  }

  ngOnInit() {
    this.getData();

    this.doctor.medicalSpecialityDoctor = [];
  }
  //autocomplete
  searchMedicalSpecialties = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(t => t === '' ? [] : this.spelcialties
        .filter(c => c.name.toLocaleLowerCase().indexOf(t) > -1)
        .slice(0, 10)
      )
    )

  searchCountries = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(t => t === '' ? [] : this.countries
        .filter(c => c.name.toLocaleLowerCase().indexOf(t) > -1)
        .slice(0, 10)
      )
    )
  searchNationalities = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(t => t === '' ? [] : this.nationalities
        .filter(c => c.name.toLocaleLowerCase().indexOf(t) > -1)
        .slice(0, 10)
      )
    )
  selectMedicalSpecialties(value: any) {
    this.isSpelciatiesNotSelected = false;
    this.fillArrayDoctorSpec(value.item);
  }
  selectCountries(value: any) {

    this.fillArrayCountries(value.item);
  }
  selectNationalities(value: any) {

    this.fillArrayNationalities(value.item);
    console.log(this.doctor)
  }
  fillArrayDoctorSpec(item: any) {

    if (!this.doctor.medicalSpecialityDoctor.some(x => x.specialityId == item.id))
      this.doctor.medicalSpecialityDoctor.push({ name: item.name, specialityId: item.id, doctorId: 0 });
    this.selectedCliente = '';
  }
  deleteRow(i) {
    this.doctor.medicalSpecialityDoctor.splice(i, 1)
  }

  fillArrayCountries(item: any) {

    this.doctor.countryId = item.id
  }
  fillArrayNationalities(item: any) {

    this.doctor.nationality = item.id
  }
  spelciatiesFormatter = (result: any) => result.name;
  countriesFormatter = (result: any) => result.name;
  nationalitiesFormatter = (result: any) => result.name;
  getData() {
    this.sexList = [
      { header: this.translate.instant('male'), value: 'M' },
      { header: this.translate.instant('female'), value: 'F' }
    ];

    this.treament = [
      { header: 'Dr.', value: 'Dr.' },
      { header: 'Dra.', value: 'Dra.' }
    ];
    this.medicalSpecialitityService.get().subscribe(response => {
      this.spelcialties = response;

    })
    this.langService.get().subscribe(respo => { this.lang = respo })
    this.getCountries();

  }
  validateRequidesFileds() {
    let result = (!this.doctor.name || !this.doctor.surName || !this.doctor.cellPhone
      || !this.doctor.exequatur || !this.doctor.sex || !this.doctor.mail
      || !this.doctor.users.userName || !this.doctor.users.password || !this.doctor.users.languageId)

      return result;
  }
  getCountries() {

    this.countryService.get().subscribe(response => {
      this.nationalities = response;
      this.countries = response
    });
  }
  save() {
    if (this.validateRequidesFileds())
      return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
    this.doctorService.post(this.doctor).subscribe(response => {
      this.router.navigate(['parameter/doctor'])
      this.alertService.success(this.translate.instant("sucessRegister"))
    }, error => {
      this.alertService.error(this.translate.instant(error.error))
    })

  }

}
