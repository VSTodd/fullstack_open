const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div> 
  )
}

const Header = ({header}) => {
  return (
    <div>
      <h2>{header}</h2>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <p><strong>Total of {total} exercises</strong></p>
    </div>
  )
}

export default Course