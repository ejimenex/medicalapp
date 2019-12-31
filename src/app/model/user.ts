import { BaseModel } from './base-model'

export class UserModel extends BaseModel{
    id:number
    name:string
    surName:string
    userName:string
    doctorId:number
    rolId:number
    mail:string
    password:string
    isLocked:boolean
    isProbatory:boolean
    expireDateProbatory:Date
    languageId:string
    rolName:string
}