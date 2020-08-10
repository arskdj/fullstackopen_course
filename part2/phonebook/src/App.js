import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({search, handler}) => {



    return (
        <div>
            <input value={search} onChange={handler}/>
        </div>
    )
}

const Phonebook = ({persons, setPersons}) => { 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)

    const addPerson = (event) => { 
        event.preventDefault()

        if (persons.findIndex(p => p.name === newName) + 1) {
            alert(`${newName} is already in the phonebook`)
        }else{
            setPersons(persons.concat({name:newName, number: newNumber})) 
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange}/>
                    <br/>
                    number: <input value={newNumber} onChange={handleNewNumberChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
        </>
    )
}

const Numbers = ({filteredPersons}) => { 

    return (
        <div>
            <ul> 
                { filteredPersons.map( p => <li key={p.name} > {p.name} {p.number}</li> ) } 
            </ul>
        </div>
    ) 
}




const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ search, setSearch ] = useState('')
    const handleSearchChange = (event) => setSearch(event.target.value)

    const filteredPersons = (()  => {
        const comparator = (p) => { 
            const pname = p.name.toLowerCase()
            const sname = search.toLowerCase()
            return pname.includes(sname)
        }

        return search === "" 
            ? persons 
            : persons.filter(comparator)     
    })()

    const fetchHook = () => { 
        console.log('fetchHook called. values = ', )
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fullfilled')
                setPersons(response.data)
            })
    }

    useEffect(fetchHook, [])

    return (
        <div>
            <h2>Search</h2>
            <Search search={search} handler={handleSearchChange} />

            <h2>Phonebook</h2>
            <Phonebook persons={persons} setPersons={setPersons} />

            <h2>Numbers</h2>
            <Numbers filteredPersons={filteredPersons} />
        </div>
    )
}

export default App
