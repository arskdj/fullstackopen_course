import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({country}) => {
    return (
        <div>
            <img width="200" src={country.flag}/>
            <h1> {country.name} </h1>
            <p> capital {country.capital} </p>
            <p> population {country.population} </p>
            <br/>
            <h1> languages </h1>
            {
                country.languages.map( l => 
                    <li key={l.iso639_2}> { l.name }  </li>)
            }
        </div>
    )
}
const Countries = ({countries}) => {
    if (countries.length === 1) {
        return <Country country={countries[0]}/>
    } else {
        return (
            <ul> 
                { countries.map( c => <li key= { c.alpha3Code } > { c.name }  </li>) }
            </ul> 
        )
    }
}

const App = () => {

    const [search, setSearch] = useState('')
    const [countries, setCountryList] = useState([])
    const [filteredCountries, setFilteredCountries] = useState(countries)

    const searchChangeHandler = (event) => {
        setSearch(event.target.value)
    }

    const getCountriesHook = () => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then( response => setCountryList(response.data))
    }
    useEffect( getCountriesHook, [])

    const filterCountriesHook = () => {
        const comparator = c => c.name.toLowerCase().includes(search.toLowerCase())
        const filteredList = countries.filter(comparator)
        setFilteredCountries(filteredList)
    }
    useEffect( filterCountriesHook, [search])

    return (
        <div>
            <div> find countries </div>
            <input value={search} onChange={searchChangeHandler} />
            <Countries countries={filteredCountries}/>
        </div>
    )
}


export default App;
