import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      </tbody>

    )
  } else {
    return (
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    )
  }
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const avg = (props.good * 1 + props.bad * -1) / total
  const positive = props.good / total * 100
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={avg}/>
        <StatisticLine text="positive" value={positive}/>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text='good'/>
        <Button onClick={handleNeutralClick} text='neutral'/>
        <Button onClick={handleBadClick} text='bad'/>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

export default App