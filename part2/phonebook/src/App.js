import React, { useState, useEffect } from 'react'
import service from './services/persons'

const Notification = ({notification}) => {
    return notification === null ? null :
        (
            <div>
                {notification} 
            </div>
        )
}

const Message = ({text}) => {
    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    } 

    return (
        <div style={style}>
            {text} 
        </div>
    )
}

const Error = ({text}) => {
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    } 

    return (
        <div style={style}>
            {text} 
        </div>
    )
}

const Search = ({search, handler}) => {
    return (
        <div>
            <input value={search} onChange={handler}/>
        </div>
    )
}

const Phonebook = ({persons, setPersons, updatePerson, createPerson}) => { 
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
            updatePerson(currentPerson, newPerson)
        }else{
            const newPerson = {name:newName, number: newNumber}
            createPerson(newPerson)
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
        window.confirm(`delete ${person.name} ?`) && deletePerson(person)
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
    const [notification, setNotification] = useState(null)

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

    const showNotification = (compoment) => {
        setNotification(compoment)
        setTimeout( () => { 
            setNotification(null)
        }, 5000)
    }

    const deletePerson = (curPerson) => {
        service.del(curPerson.id).then(
            setPersons(persons.filter( p => p.id !== curPerson.id ))
        )
        const msg = `${curPerson.name} deleted`
        showNotification(<Message text={msg} />)
    }

    const updatePerson = (curPerson, newPerson) => {
        service.update(curPerson.id, newPerson).then( res => {
            setPersons(persons.map( person => 
                person.id === curPerson.id ? res : person
            ))
            const msg = `${curPerson.name} updated`
            showNotification(<Message text={msg} />)
        }).catch( error => {
            const msg = `Infomation on ${curPerson.name} does not exist on server. ${error}`
            showNotification(<Error text={msg} />)
        })
    }

    const createPerson = (newPerson) => { 
        service.create(newPerson).then(res => {
            setPersons(persons.concat(res)) 
        })
        const msg = `${newPerson.name} added`
        showNotification(<Message text={msg} />)
    }

    return (
        <div>
            <Notification notification= {notification} />
            <h2>Search</h2>
            <Search search={search} handler={handleSearchChange} />

            <h2>Phonebook</h2>
            <Phonebook persons={persons} setPersons={setPersons} updatePerson={updatePerson} createPerson={createPerson} />

            <h2>Numbers</h2>
            <Numbers filteredPersons={filteredPersons} deletePerson={deletePerson} />
        </div>
    )
}

export default App
