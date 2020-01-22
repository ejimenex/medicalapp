import { BaseModel } from './base-model'

export class PatientModel extends BaseModel{
   name:string
   mail:string
   reference1:string
   reference2:string
   reference3:string
   sSN:string
   phone:string
   bornDate:Date
   doctorId:number
   arsId:number

}