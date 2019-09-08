import React from 'react'
import Statistic from './Statistic'

export default ({ all, bad, good, neutral }) => {
  const getPositive = () => good * 100 / all
  const getAverage = () => (good - bad) / all

  return (
    <>
      <h1>statistics</h1>
      {all ? (
        <>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={getAverage()} />
          <Statistic text="positive" value={`${getPositive()} %`} />
        </>
      ) : (
        <div>No feedback given</div>
      )}
    </>
  )
}
