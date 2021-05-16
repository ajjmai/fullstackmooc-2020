import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatientInfo } from '../types';

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

export default { getData, getNonSensitiveData };
