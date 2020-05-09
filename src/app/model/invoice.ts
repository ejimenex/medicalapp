import { BaseModel } from './base-model'

export class invoice extends BaseModel
{
    id:number
    doctorGuid:string
    invoiceNumber:string
    patientId:number
    isBilled:boolean
    currencyId:number
    billedDate:Date
    totalItem:number
    discount:number

    total:number
    patientName:string
    officeId:number
    officeName:string
}

export class invoiceDetail
{
    id:number
    invoiceId:number
    medicalServiceId:number
    patientId:number
    price:number
    qty:number
    discount:number
    total:number
    discountReasonId:number
    medicalService:string
    discountReason:string
}