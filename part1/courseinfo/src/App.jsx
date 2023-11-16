

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ],
  }

  const Header = () => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part part={course.parts[0].name} exercises={course.parts[0].exercises}/>
        <Part part={course.parts[1].name} exercises={course.parts[1].exercises}/>
        <Part part={course.parts[2].name} exercises={course.parts[2].exercises}/>
      </div>
    )
  }

  const Part = (content) => {
    return (
      <div>
        <p>
          {content.part} {content.exercises}
        </p>
      </div>
    )
  }

  const Total = () => {
    return (
      <div>
        <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course}/>
    </div>
  )
}

export default App