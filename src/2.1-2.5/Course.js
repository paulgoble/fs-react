const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercises}</p>
)

const Content = ({parts}) => (
  <div>
    {parts.map(part => 
      <Part part={part.name} exercises={part.exercises} key={part.id} />
    )}
  </div>
)

const Total = ({parts}) => {
  let total = parts.map(part => part.exercises).reduce((a,b) => a + b, 0)
  return (
    <h4>Total of {total} exercises.</h4>
  )
}

export const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />  
  </div>
)