import { STATUS_CITE } from "../enums/cite.enum";
import { User } from "./user.interface";

export interface Cite{
  title: string;
  description?: string;
  date: string;
  imageUrl?: string;
  idUserReserved: string,
  user: User,
  status: STATUS_CITE,
  reason_cancel?: string
  medical_response: MedicalResponse
}

interface MedicalResponse {
  observation: string
  recipe: string
}
