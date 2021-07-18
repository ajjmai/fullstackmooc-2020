import React from 'react';
import { useStateValue } from '../state';

const DiagnosisCodes: React.FC<{ diagnosisCodes: string[] | undefined }> = ({
  diagnosisCodes,
}) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnoseName = (code: string) => {
    const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
    return diagnose ? diagnose.name : '';
  };

  return (
    <ul>
      {diagnosisCodes?.map((code) => (
        <li key={code}>
          {code} {getDiagnoseName(code)}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisCodes;
