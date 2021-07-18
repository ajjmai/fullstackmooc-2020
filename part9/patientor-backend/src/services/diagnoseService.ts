import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getData = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getData,
};
