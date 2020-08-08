import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => (
  <p>Number of exercises {props.number}</p>
)

const Content = (props) => (
  <>
  <Part part={props.vars.part1} />
  <Part part={props.vars.part2} />
  <Part part={props.vars.part3} />
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const vars = {
    part1 : part1,
    part2 : part2,
    part3 : part3
  }

  return (
    <div>
      <Header course={course} />
      <Content vars={vars} />
      <Total number={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))