import { BaseModel } from './base-model'

export class PersonalScheduleModel extends BaseModel{
  patientId:number
  eventTypeId:number
  note:string
  eventDate:Date
  doctorGuid:string
  state:boolean
  patientName:string
  eventName:string
}