import React from "react"

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce( (sum, i) => sum + i.exercises, 0)

  return(
    <p> <strong> Total of {sum} exercises</strong></p>
  )
}


const Part = (props) => { 
    return ( <p> {props.part.name} {props.part.exercises} </p>) 
}

const Content = ({ parts }) => {
  return (
    <div>
        { parts.map(part=> 
             <Part key={ part.id } part={ part } /> 
        )
        }
    </div>
  )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
