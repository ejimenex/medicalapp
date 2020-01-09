import { BaseModel } from './base-model'
import { MedicalSpecilityDoctor } from './medicalSpecilityDoctor'
import { UserModel } from './user'

export class DoctorModel extends BaseModel{

    name:string
    surName:string
    mail:string
    exequatur:string
    documentId:string
    bornDate:Date
    sex:string
    treament:string
    phone1:string
    phone2:string
    city:string
    nationality:number
    countryId:number
    cellPhone:number
    medicalSpecialityDoctor:MedicalSpecilityDoctor[]
    users:UserModel =new UserModel()


}