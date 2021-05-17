import React from 'react';
import { CoursePart } from './App';

interface CoursePartProps {
  part: CoursePart;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Part = (props: CoursePartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const partTitle = () => (
    <h3>
      {props.part.name} {props.part.exerciseCount}
    </h3>
  );

  switch (props.part.type) {
    case 'normal':
      return (
        <>
          {partTitle()}
          <p>
            <em>{props.part.description}</em>
          </p>
        </>
      );
    case 'groupProject':
      return (
        <>
          {partTitle()}
          <p> project exercises {props.part.groupProjectCount}</p>
        </>
      );
    case 'submission':
      return (
        <>
          {partTitle()}
          <p>
            <em>{props.part.description}</em>
          </p>
          <p>submit to {props.part.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          {partTitle()}
          <p>
            <em>{props.part.description}</em>
          </p>
          <p>required skills: {Object.values(props.part.requirements).join(', ')}</p>
        </>
      );
    default:
      assertNever(props.part);
      return <></>;
  }
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
