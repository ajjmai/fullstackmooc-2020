export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: { date: string; criteria: string };
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}
