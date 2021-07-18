import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, Gender } from '../types';

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: 'SET_PATIENT_INFO', payload: patientInfoFromApi });
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
    </div>
  );
};

export default PatientInfoPage;
