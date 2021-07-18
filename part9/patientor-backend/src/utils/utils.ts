import { Diagnosis, Gender, NewPatient } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (str: string): str is Gender => {
  return ['female', 'male', 'other'].includes(str);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error('Incorrect or missing code');
  }
  return code;
};

const parseLatin = (latin: unknown): string | undefined => {
  if (!latin) {
    return undefined;
  }
  if (!isString(latin)) {
    throw new Error('Incorrect latin');
  }
  return latin;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};

type DiagnoseFields = {
  code: unknown;
  name: unknown;
  latin?: unknown;
};

export const toDiagnose = ({ code, name, latin }: DiagnoseFields): Diagnosis => {
  return {
    code: parseCode(code),
    name: parseName(name),
    latin: parseLatin(latin),
  };
};
