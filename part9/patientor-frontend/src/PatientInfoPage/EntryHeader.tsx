import React, { ReactNode } from 'react';
import { Entry } from '../types';

const EntryHeader: React.FC<{ entry: Entry; icon: ReactNode }> = ({
  entry,
  icon,
}) => {
  return (
    <div>
      <h3>
        {icon}
        {entry.date}
      </h3>
      <p>
        <i>{entry.description}</i>
      </p>
    </div>
  );
};

export default EntryHeader;
