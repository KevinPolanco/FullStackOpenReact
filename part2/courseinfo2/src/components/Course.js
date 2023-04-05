const Part = ({name, exercises}) => {
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
};

const Content = ({ content }) => {
  return (
    <>
      {content.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      ))} 
    </>
  )
};

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  )
};

const Course = (props) => {
  return (
    <>
      <Header header={props.course.name}/>
      <Content content={props.course.parts}/>
    </>
  )
};

export default Course;
