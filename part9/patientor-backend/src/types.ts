export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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