import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientInfo } from '../state';
import { Patient, Gender, Entry } from '../types';

const EntryItem: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>
        {entry.date} <i>{entry.description}</i>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  );
};

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
