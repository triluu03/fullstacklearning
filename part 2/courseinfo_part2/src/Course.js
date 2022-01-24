import React from 'react'


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
  const exercise_list = course.parts.map(part => part.exercises)
  const sum = exercise_list.reduce((total, exercise) => total + exercise)
  return <b>total of {sum} exercises</b>
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course