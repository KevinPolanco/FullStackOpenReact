const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ content }) => {
  const arrAllExexercises = [];

  for (let i = 0; i < content.length; i++) {
    arrAllExexercises.push(content[i].exercises);
  }

  const totalExercises = arrAllExexercises.reduce((acc, cur) => {
    return acc + cur;
  });

  return (
    <>
      {content.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p><strong>total of {totalExercises} exercises</strong></p>
    </>
  );
};

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  );
};

const Course = ({course}) => {
  return (
    <>
      <Header header={course.name} />
      <Content content={course.parts} />
    </>
  );
};

const Courses = ({courses}) => {
  return (
    <>
      {courses.map((course) => (
          <Course key={course.id} course={course}/>
        )
      )}
    </>
  );
};

export default Courses;

