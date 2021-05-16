import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatientInfo, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getData = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getData, getNonSensitiveData, addPatient };
