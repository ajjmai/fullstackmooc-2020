import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import {
  Entry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry,
} from '../types';
import DiagnosisCodes from './DiagnosisCodes';
import EntryHeader from './EntryHeader';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <EntryHeader entry={entry} icon={<Icon name="hospital" size="big" />} />
      <p>
        {`Discharged on ${entry.discharge.date} because "${entry.discharge.criteria}".`}
      </p>
      <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
    </Segment>
  );
};

const OccupationalHealtcare: React.FC<{ entry: OccupationalHealthcareEntry }> =
  ({ entry }) => {
    return (
      <Segment>
        <EntryHeader
          entry={entry}
          icon={<Icon name="stethoscope" size="big" />}
        />
        {entry.sickLeave?.startDate && (
          <p>
            {`Sick leave from ${entry.sickLeave?.startDate} to 
            ${entry.sickLeave?.endDate}.`}
          </p>
        )}
        <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
      </Segment>
    );
  };

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthCheckIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <Icon name="heart" color="green" />;
      case 1:
        return <Icon name="heart" color="yellow" />;
      case 2:
        return <Icon name="heart" color="orange" />;
      case 3:
        return <Icon name="heart" color="red" />;
      default:
    }
  };

  return (
    <Segment>
      <EntryHeader entry={entry} icon={<Icon name="doctor" size="big" />} />
      {healthCheckIcon()}
      <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealtcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;
