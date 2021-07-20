/* eslint-disable react/display-name */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Entry } from '../types';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalEntryForm from './AddOccupationalEntryForm';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryFormValues = UnionOmit<Entry, 'id' | 'type'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const EntryFromWrapper = ({ onSubmit, onCancel }: Props) => {
  const panes = [
    {
      menuItem: 'Health Check Entry',
      render: () => (
        <Tab.Pane>
          <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Hospital Entry',
      render: () => (
        <Tab.Pane>
          <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Occupational Healthcare Entry',
      render: () => (
        <Tab.Pane>
          <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} />;
};

export default EntryFromWrapper;
