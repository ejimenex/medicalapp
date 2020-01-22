import { BaseModel } from './base-model'

export class MedicalSchedule extends BaseModel{

    medicalCenterId:number
    doctorId:number
    monday:string
    maxQuantityMonday:number
    tuesday:string
    maxQuantityTuesday:number
    wednesady:string
    maxQuantityWednesady:number
    thursday:string
    maxQuantityThursday:number
    friday:string
    maxQuantityFriday:number
    saturday:string
    maxQuantitySaturday:number
    sunday:string
    maxQuantitySunday:number
    medicalScheduleName:string
    medicalCenterName:string
}