export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  healthRecords?: string[];
  age: number;
  condition: string[];
  medicalHistory?: string[]; // New field
  pastTreatments?: pastTreatments[]; // New field
  labResults?: { date: string; result: string; testName: string }[]; // New field
  __v: number;
}

export interface pastTreatments {
  date: string;
  notes: string;
  treatment: string;
  _id: string;
}

export interface HealthRecord {
  date: string;
  detail: string;
}

export interface AuthorizationRequest {
  patientId: string;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: string;
  diagnosisCode: string;
}
