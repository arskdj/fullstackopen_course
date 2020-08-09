import React, { useState } from 'react'

const Phonebook = () => { 
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
                { persons.map( p => <li key={p.name} > {p.name} {p.number}</li> ) } 
            </ul>
        </div>
    ) 
}




const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }


    const handleSearchChange = (event) => {

        let search = event.target.value 
        setSearch(search)
        
    }

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

    const filteredPersons = (()  => {
        const comparator = (p) => { 
            const pname = p.name.toLowerCase()
            const sname = search.toLowerCase()
            return pname.includes(sname)
        }

        return search === "" ? persons 
            : persons.filter(comparator)     
    })()

    return (
        <div>
            <h2>Search</h2>
            <input value={search} onChange={handleSearchChange}/>
            <h2>Phonebook</h2>
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
            <Numbers persons={filteredPersons}/>
        </div>
    )
}

export default App
