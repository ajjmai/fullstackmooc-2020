import React from 'react';

interface Course {
  name: string;
  exerciseCount: number;
}

interface CourseProps {
  course: Course;
}

interface ContentProps {
  courseParts: Course[];
}

const Course = (props: CourseProps) => {
  return (
    <p>
      {props.course.name} {props.course.exerciseCount}
    </p>
  );
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((course) => (
        <Course key={course.name} course={course} />
      ))}
    </div>
  );
};

export default Content;
