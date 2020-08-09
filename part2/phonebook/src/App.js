import React, { useState } from 'react'

const Phonebook = () => { 
    console.log()
    return (
            <>
            </>
    )
}

const Numbers = ({persons}) => { 
    console.log(persons)


    return (
                <div>
                <h2>Numbers</h2>
                { persons.map( p => <p key={p.name} > {p.name} </p> ) }
        </div>
    ) 
}




const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ])

    const [ newName, setNewName ] = useState('')

    const handleNewNameChange = (event) => {
        const value = event.target.value
        console.log(value)
        setNewName(value)
    }


    const addPerson = (event) => { 
        console.log("addPerson called. values = ", event)
        event.preventDefault()
        setPersons(persons.concat({name:newName})) 
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
            <Numbers persons={persons}/>
        </div>
    )
}

export default App
