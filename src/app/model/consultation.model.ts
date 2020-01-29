import { BaseModel } from './base-model'

export class ConsultationModel extends BaseModel {
    patientId: number
    officeId: number
    appointmentId: number
    ReasonVisitId: number
    doctorId: number
    reasonConsultation: string
    diagnosis: string
    medicalIndication: string
    medicalObservation1: string
    medicalObservation2: string
    nextDateVisit: Date
    officeName: string
    patientName: string
    reasonDescription: string
}