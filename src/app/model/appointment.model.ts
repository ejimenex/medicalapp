import { BaseModel } from './base-model'
export class AppointmentModel extends BaseModel{
date:Date
time:string
note:string
patientId:number
doctorId:number
officeId:number
appointmentStateId:number
patientName:string
officeName:string
appointmentStateName:string
}