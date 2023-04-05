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

const Course = (props) => {
  return (
    <>
      <Header header={props.course.name} />
      <Content content={props.course.parts} />
    </>
  );
};

export default Course;
