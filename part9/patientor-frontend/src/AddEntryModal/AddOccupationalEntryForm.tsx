import React from 'react';
import { Field, Formik, Form } from 'formik';

import CommonFields from './CommonFields';
import Buttons from './Buttons';
import { EntryFormValues } from './EntryFromWrapper';
import { TextField } from '../AddPatientModal/FormField';
import { isValidDate } from '../utils';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <>
      <Formik
        initialValues={{
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: [],
          type: 'OccupationalHealthcare',
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          },
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          let errors:
            | { [field: string]: string }
            | {
                [key: string]: {
                  [key: string]: string;
                };
              } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          } else if (!isValidDate(values.date)) {
            errors.date = 'Invalid date format';
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (
            values.sickLeave?.startDate &&
            !isValidDate(values.sickLeave?.startDate)
          ) {
            errors = {
              ...errors,
              sickLeave: { startDate: 'Invalid date format' },
            };
          }
          if (
            values.sickLeave?.endDate &&
            !isValidDate(values.sickLeave?.endDate)
          ) {
            errors = {
              ...errors,
              sickLeave: { endDate: 'Invalid date format' },
            };
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <CommonFields
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Sickleave start date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="Sickleave end date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
              <Buttons isValid={isValid} dirty={dirty} onCancel={onCancel} />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEntryForm;
