import { BaseModel } from './base-model'
import { PatientModel } from './patient.model'

export class MedicalProcessModel extends BaseModel{
    patientId: number;
    doctorId: number;
    serviceId: number;
    processDate: string;
    processStatus: number;
    observation: string;
    serviceType: number;
    place:string
    officeId:number
    patient: PatientModel;
    medicalServicesName: string;
    medicalProcessStatusName: string;
    serviceTypeName: string;
}

