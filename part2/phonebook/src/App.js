import React, { useState, useEffect } from 'react'
import service from './services/persons'

const Search = ({search, handler}) => {



    return (
        <div>
            <input value={search} onChange={handler}/>
        </div>
    )
}

const Phonebook = ({persons, setPersons, updatePerson}) => { 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)

    const addPerson = (event) => { 
        event.preventDefault()

        const comparator = p => {
            const pname = p.name.toLowerCase()
            const sname = newName.toLowerCase()
            return sname === pname

        }
        const personIndex = persons.findIndex(comparator)
        const msg = `${newName} is already in the phonebook. Do you want to update?`
        if ((personIndex + 1) && window.confirm(msg)) {
            const currentPerson = persons[personIndex]
            const newPerson = { ...currentPerson , number: newNumber }
            updatePerson(currentPerson.id, newPerson)
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
    const deleteHandler = () => {
        window.confirm(`delete ${person.name} ?`) && deletePerson(person.id)
    }
    return (
        <div>
            <li> {person.name} {person.number} <button onClick={deleteHandler} > delete </button></li>
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

    const updatePerson = (personId, newPerson) => {
        service.update(personId, newPerson).then( res =>
            setPersons(persons.map( person => 
                person.id === personId ? res : person
            ))
        )
    }

    return (
        <div>
            <h2>Search</h2>
            <Search search={search} handler={handleSearchChange} />

            <h2>Phonebook</h2>
            <Phonebook persons={persons} setPersons={setPersons} updatePerson= {updatePerson}/>

            <h2>Numbers</h2>
            <Numbers filteredPersons={filteredPersons} deletePerson= {deletePerson}/>
        </div>
    )
}

export default App
