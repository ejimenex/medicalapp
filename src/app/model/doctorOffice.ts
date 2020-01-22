import { BaseModel } from './base-model'

export class DoctorOffice extends BaseModel{
    id:number
    name:string
    specification:string
    doctorId:number
    medicalCenterId:number
    doctorName:string
    urlMapsAddress:string
    medicalCenterName:string
}