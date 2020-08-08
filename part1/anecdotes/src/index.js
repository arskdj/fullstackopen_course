import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, points}) => (
	<>
	<p> <em> {text} </em> </p>
	<p> has <strong> {points} </strong> votes </p>
	</>
)

const App = ({anecdotes}) => {
	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0))


	const getRandomIndex = () => {
		const n = Math.random() * 1000
		const index =parseInt(n % anecdotes.length) 
		setSelected(index)
	}

	const vote = () => {
		let copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}

	//debugger

	return (
		<div>
			<button onClick={vote}> vote </button>
			<button onClick={getRandomIndex}> next anecdote </button>
			<Anecdote text={anecdotes[selected]} points={points[selected]} />
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)
