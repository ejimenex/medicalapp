import { BaseModel } from './base-model'

export class MedicalForm extends BaseModel{
    question:string
    doctorGuid:string
    type:string
    noOrder:number
}
export class PatientForm extends BaseModel{
    questionName:string
    doctorGuid:string
    patientId:string
    noOrder:number
    type:string
    questionId:number
    answer:string
}