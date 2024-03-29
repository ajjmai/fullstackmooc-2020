import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) res.send(patient);
  else res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientService.findById(req.params.id);

    if (patient && newEntry) {
      const patientWithNewEntry = patientService.addEntry(newEntry, patient);
      res.json(patientWithNewEntry);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
