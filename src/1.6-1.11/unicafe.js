import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (!total) { 
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <tbody>
      <StatisticsLine text="Good:" value={good} />
      <StatisticsLine text="Neutral:" value={neutral} />
      <StatisticsLine text="Bad:" value={bad} />
      <StatisticsLine text="Total:" value={total} />
      <StatisticsLine text="Avg:" value={(good - bad) / total || 0} />
      <StatisticsLine text="%Pos:" value={(good / total) * 100 || 0} />
    </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback:</h2>
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <h2>Results:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;