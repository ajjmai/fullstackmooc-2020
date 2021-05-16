import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getData = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getData,
};
