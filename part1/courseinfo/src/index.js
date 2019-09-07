import React from 'react'
import ReactDOM from 'react-dom'

import Total from './Total'
import Header from './Header'
import Content from './Content'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        exercises: 10,
        name: 'Fundamentals of React',
      },
      {
        exercises: 7,
        name: 'Using props to pass data',
      },
      {
        exercises: 14,
        name: 'State of a component',
      },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
