import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientInfo, addEntry } from '../state';
import { Patient, Gender } from '../types';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(patientInfoFromApi));
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
      }
    };
    if (!patient || patient?.id !== id) {
      void fetchPatientInfo();
    }
  }, [dispatch, id, patient]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: patientWithNewEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(patientWithNewEntry);
      dispatch(addEntry(patientWithNewEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const genderIcon =
    patient?.gender === Gender.Male
      ? 'mars'
      : patient?.gender === Gender.Female
      ? 'venus'
      : 'genderless';

  return (
    <div>
      <h2>
        {patient?.name} <Icon name={genderIcon} size="big" />
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
