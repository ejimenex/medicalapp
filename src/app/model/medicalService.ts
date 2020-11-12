import { BaseModel } from './base-model'

export class MedicalService extends BaseModel{
   name:string
   price:number
   applyInsurance:boolean
   applyInsuranceName:string   
   doctorGuid:string
   insurancePrice:number
   currencyId:string
   currencyName:string
   isBasicConsultation:boolean
}