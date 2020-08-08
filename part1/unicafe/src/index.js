import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => (
	<h1> {title} </h1>
)

const Button = ({handler,text}) => (
	<button onClick={handler}> {text} </button>
)


const Feedback = ({strings, handlers}) => { 

	return (
		<>
			<Header title="give feedback"/>
			<Button handler={handlers[0]} text={strings[0]}/>
			<Button handler={handlers[1]} text={strings[1]}/>
			<Button handler={handlers[2]} text={strings[2]}/>
		</>
	)
}


const Row = ({text, num}) => (
	<p> {text} {num} </p>
)

const Statistics = ({strings,statistics}) => {

	return (

		<>
			<Header title="statistics"/>
			<Row text={strings[0]} num={statistics[0]}/>
			<Row text={strings[1]} num={statistics[1]}/>
			<Row text={strings[2]} num={statistics[2]}/>
		</>
	)
}


const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)


	const incGood = () => setGood(good+1)
	const incNeutral = () => setNeutral(neutral+1)
	const incBad = ()=> setBad(bad+1)

	const strings = ["good", "neutral", "bad"]
	const statistics = [ good, neutral, bad]
	const handlers = [incGood, incNeutral, incBad]

	return (
		<div>
			<Feedback strings={strings} handlers={handlers}/>
			<Statistics strings={strings} statistics = {statistics} />
		</div>
	)
}

ReactDOM.render(<App />, 
	document.getElementById('root')
)
