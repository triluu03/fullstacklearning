import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    
  
  )
}

const Statistics = (props) => {
  const sum = props.stat[0] + props.stat[1] + props.stat[2]
  if (sum === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.stat[0]} />
          <StatisticLine text="neutral" value={props.stat[1]} />
          <StatisticLine text="bad" value={props.stat[2]} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={(props.stat[0] - props.stat[2])/sum} />
          <StatisticLine text="positive" value={100*(props.stat[0]/sum)} />
        </tbody>
      </table>
      
                                  
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics stat={[good, neutral, bad]} />
    </div>
  )
}

export default App
