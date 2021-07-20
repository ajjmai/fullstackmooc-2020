import React from 'react';
import { Field, Formik, Form } from 'formik';

import { NumberField } from '../AddPatientModal/FormField';
import { HealthCheckRating } from '../types';
import CommonFields from './CommonFields';
import Buttons from './Buttons';
import { EntryFormValues } from './EntryFromWrapper';
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
          type: 'HealthCheck',
          healthCheckRating: HealthCheckRating.Healthy,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
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
          if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
            errors.healthCheckRating = 'Value must be between 0 and 3';
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
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
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
