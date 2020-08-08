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

	if (statistics[0] || statistics[1] || statistics[2])
		return (

			<>
				<Header title="statistics"/>
				<Row text={strings[0]} num={statistics[0]}/>
				<Row text={strings[1]} num={statistics[1]}/>
				<Row text={strings[2]} num={statistics[2]}/>
				<Row text={strings[3]} num={statistics[3]}/>
				<Row text={strings[4]} num={statistics[4]}/>
				<Row text={strings[5]} num={statistics[5] + " %"}/>
			</>
		)
	else
		return (

			<>
				<Header title="statistics"/>
				<p> No feedback given </p>
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

	const all = good + bad + neutral
	const average = (good - bad)/all
	const positive = good/all*100
	const strings = ["good", "neutral", "bad", "all", "average", "positive"]
	const statistics = [ good, neutral, bad, all, average, positive]
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
