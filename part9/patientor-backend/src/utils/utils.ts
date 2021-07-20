import { Diagnosis, Gender, HealthCheckRating, NewEntry, NewPatient } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEntryType = (entry: any): entry is NewEntry => {
  return entry.type === 'HealthCheck' || entry.type === 'OccupationalHealthcare' || entry.type === 'Hospital';
};

const parseEntry = (entry: unknown): NewEntry => {
  if (!entry || !isValidEntryType(entry)) {
    throw new Error('Incorrect or missing entry type: ' + entry);
  }
  return entry;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes) || !diagnosisCodes.every((code) => isString(code))) {
    throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosisCodes;
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  if (!isNumber(rating)) {
    throw new Error('Incorrect healthCheckRating: ' + rating);
  }
  return [0, 1, 2, 3].includes(rating);
};

const parseHealtCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === null || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): { startDate: string; endDate: string } => {
  if (!sickLeave || Object.keys(sickLeave).length === 0) {
    return { startDate: '', endDate: '' };
  }

  if (!sickLeave.startDate && !sickLeave.endDate) {
    return { startDate: '', endDate: '' };
  }
  return {
    startDate: parseDate(sickLeave?.startDate),
    endDate: parseDate(sickLeave?.endDate),
  };
};

export const toNewEntry = (newEntry: unknown): NewEntry => {
  const validEntryType = parseEntry(newEntry);

  const entry = {
    description: parseDescription(validEntryType.description),
    date: parseDate(validEntryType.date),
    specialist: parseSpecialist(validEntryType.specialist),
    diagnosisCodes: parseDiagnosisCodes(validEntryType.diagnosisCodes),
  };

  switch (validEntryType.type) {
    case 'HealthCheck':
      return {
        type: validEntryType.type,
        healthCheckRating: parseHealtCheckRating(validEntryType.healthCheckRating),
        ...entry,
      };
    case 'OccupationalHealthcare':
      return {
        type: validEntryType.type,
        employerName: parseName(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave),
        ...entry,
      };
    case 'Hospital':
      return {
        type: validEntryType.type,
        discharge: {
          date: parseDate(validEntryType.discharge.date),
          criteria: parseCriteria(validEntryType.discharge.criteria),
        },
        ...entry,
      };
    default:
      return assertNever(validEntryType);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
