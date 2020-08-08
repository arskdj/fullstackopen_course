import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Exercise = (props) => (
  <p>
    {props.name} {props.points}
  </p>
)

const Total = (props) => (
  <p>Number of exercises {props.number}</p>
)

const Content = (props) => (
  <>
  <Exercise name={props.vars.part1} points={props.vars.exercises1} />
  <Exercise name={props.vars.part2} points={props.vars.exercises2} />
  <Exercise name={props.vars.part3} points={props.vars.exercises3} />
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const vars = {
    part1 : part1,
    part2 : part2,
    part3 : part3,
    exercises1 : exercises1,
    exercises2 : exercises2,
    exercises3 : exercises3,
  }

  return (
    <div>
      <Header course={course} />
      <Content vars={vars} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))