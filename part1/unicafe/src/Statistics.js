import React from 'react'

export default ({ all, bad, good, neutral }) => {
  const getPositive = () => good * 100 / all
  const getAverage = () => (good - bad) / all

  return (
    <>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {getAverage()}</div>
      <div>positive {getPositive()} %</div>
    </>
  )
}
