import React from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1[0]} exercise={props.part1[1]}/>
      <Part name={props.part2[0]} exercise={props.part2[1]}/>
      <Part name={props.part3[0]} exercise={props.part3[1]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={[part1, exercise1]} part2={[part2, exercise2]} part3={[part3, exercise3]}/>
      <Total total={exercise1 + exercise2 + exercise3} />
    </div>
  )
}

export default App
