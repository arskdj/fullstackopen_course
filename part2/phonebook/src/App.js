import React, { useState } from 'react'

const Phonebook = () => { 
    console.log()
    return (
        <>
        </>
    )
}

const Numbers = ({persons}) => { 

    return (
        <div>
            <h2>Numbers</h2>
            <ul> 
                { persons.map( p => <li key={p.name} > {p.name} </li> ) } 
            </ul>
        </div>
    ) 
}




const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ])

    const [ newName, setNewName ] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }


    const addPerson = (event) => { 
        console.log("addPerson called.", newName)

        event.preventDefault()

        if (persons.findIndex(p => p.name === newName) + 1) {
            alert(`${newName} is already in the phonebook`)
        }else{
            setPersons(persons.concat({name:newName})) 
            setNewName('')
        }
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
