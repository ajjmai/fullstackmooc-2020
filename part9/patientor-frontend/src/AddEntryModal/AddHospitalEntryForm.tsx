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
          type: 'Hospital',
          discharge: {
            date: '',
            criteria: '',
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
          if (!values.discharge.date) {
            errors = {
              ...errors,
              discharge: { date: requiredError },
            };
          } else if (!isValidDate(values.discharge.date)) {
            errors = {
              ...errors,
              discharge: { date: 'Invalid date format' },
            };
          }
          if (!values.discharge.criteria) {
            errors = {
              ...errors,
              discharge: { criteria: requiredError },
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
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
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
