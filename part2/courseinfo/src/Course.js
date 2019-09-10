import React from 'react'

import Total from './Total'
import Header from './Header'
import Content from './Content'

export default ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)
