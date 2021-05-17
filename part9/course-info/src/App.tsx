import React from 'react';
import Content from './Content';
import Header from './Header';
import Total from './Total';

interface Course {
  name: string;
  exerciseCount: number;
}

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: Course[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
