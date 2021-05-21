import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Patient, Gender } from '../types';

const Patient: React.FC<{ patient: Patient }> = ({ patient }) => {
  const genderIcon =
    patient.gender === Gender.Male
      ? 'mars'
      : patient.gender === Gender.Female
      ? 'venus'
      : 'genderless';

  return (
    <div>
      <h2>{patient.name}</h2>
      <Icon name={genderIcon} />
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default Patient;
