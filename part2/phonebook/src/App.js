import React, { useState, useEffect } from 'react'
import service from './services/persons'

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
            const newPerson = {name:newName, number: newNumber}
            service.create(newPerson).then(res => {
                setPersons(persons.concat(res)) 
                setNewName('')
                setNewNumber('')
            })
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

const Numbers = ({filteredPersons, deletePerson}) => { 
    console.log('rendering Numbers',filteredPersons)
    if (filteredPersons === undefined || Object.entries(filteredPersons) === 0)
        return <div> <p> No persons in db </p> </div>

            return (
                <div>
                    <ul> 
                        { filteredPersons.map( p => <NumberRow key={p.name} person={p} deletePerson= {deletePerson} /> ) } 
                    </ul>
                </div>
            ) 
}


const NumberRow = ({person, deletePerson}) => {
    return (
        <div>
            <li> {person.name} {person.number} <button onClick={() => deletePerson(person.id)} > delete </button></li>
        </div>
    )
}



const App = () => {
    console.log('rendering App')
    const [ persons, setPersons ] = useState([])
    const [ search, setSearch ] = useState('')
    const handleSearchChange = (event) => setSearch(event.target.value)

    const fetchHook = () => { 
        service
            .getAll()
            .then(res => setPersons(res))
        console.log('fetchHook', persons)
    }
    useEffect(fetchHook, [])


    const filteredPersons = (() => {
        const comparator = p => { 
            const pname = p.name.toLowerCase()
            const sname = search.toLowerCase()
            return pname.includes(sname)
        }


        return search === "" 
            ? persons 
            : persons.filter(comparator)     
        console.log('filter hook', filteredPersons)
    })()

    const deletePerson = (personId) => {
        service.del(personId).then(
            setPersons(persons.filter( p => p.id !== personId ))
        )
    }


    return (
        <div>
            <h2>Search</h2>
            <Search search={search} handler={handleSearchChange} />

            <h2>Phonebook</h2>
            <Phonebook persons={persons} setPersons={setPersons} />

            <h2>Numbers</h2>
            <Numbers filteredPersons={filteredPersons} deletePerson= {deletePerson}/>
        </div>
    )
}

export default App
