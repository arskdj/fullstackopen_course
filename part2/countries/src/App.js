import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Weather = ({weather}) => {
    console.log('rendering weather')

    if (weather === undefined || Object.entries(weather).length === 0 || weather.success === false) {
        return <div>  </div> 
    }

    console.log(weather)
    return (
        <div>
            <h1> Weather in {weather.request.query} </h1>            
            <img width="100" src={weather.current.weather_icons[0]} alt={weather.current.weather_icons[0]} />
            <p> temp: {weather.current.temperature} Celsius </p>
            <p> wind: { weather.current.wind_speed } mph direction { weather.current.wind_dir }</p>
        </div>
    )
}

const Search = ({search, searchChangeHandler}) => {
    console.log('rendering Search')
    return (
        <div>
            <div> find countries </div>
            <input value={search} onChange={searchChangeHandler} />
        </div>
    )
}

const CountryDetails = ({selectedCountry}) => {
    console.log('rendering CountryDetails')
    if (selectedCountry === undefined || Object.entries(selectedCountry).length === 0) {
        return <div>  </div> 
    }

    return (
        <div>
            <img width="200" src={selectedCountry.flag} alt="selectedCountry flag"/>
            <h1> {selectedCountry.name} </h1>
            <p> capital {selectedCountry.capital} </p>
            <p> population {selectedCountry.population} </p>
            <br/>
            <h1> languages </h1>
            {
                selectedCountry.languages.map( l => 
                    <li key={l.iso639_2}> { l.name }  </li>)
            }
        </div>
    )
}

const CountryRow = ({country, setSelectedCountry}) => {
    console.log('rendering CountryRow')
    return (
        <div>
            <li> { country.name } <button onClick={ () => setSelectedCountry(country)}> show </button>
            </li> 
        </div>
    )
}

const CountryList = ({countries, setSelectedCountry }) => {
    console.log('rendering CountryList', countries)

    if (countries.length > 10) {
        return <p> too many matches, specify another filter </p>
    }

    return (
        <div> 
            <ul> 
                { countries.map( c => 
                <CountryRow key= { c.alpha3Code } country={c} setSelectedCountry={ setSelectedCountry } />) }
            </ul> 
        </div>
    )
}

const App = () => {
    console.log('rendering App')

    const [search, setSearch] = useState('')
    const [countries, setCountryList] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [selectedCountry , setSelectedCountry ] = useState({})
    const [weather, setWeather] = useState({})

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY

    const searchChangeHandler = (event) => {
        setSearch(event.target.value)
    }

    const fetchCountriesHook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountryList(response.data))
    }
    useEffect( fetchCountriesHook, [])


    const filterCountriesHook = () => {
        const comparator = c => c.name.toLowerCase().includes(search.toLowerCase())
        setFilteredCountries(countries.filter(comparator))
    }
    useEffect(filterCountriesHook, [search])

    const selectCountryHook = () => {
        console.log('selectCountryHook', filteredCountries)
        if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0])
        } else {
            setSelectedCountry({})
        }
    }
    useEffect( selectCountryHook, [filteredCountries])

    const fetchWeatherHook = () => {
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${selectedCountry.capital}`
        axios
            .get(url)
            .then(response => setWeather(response.data))
        console.log(url)
    }
    useEffect( fetchWeatherHook, [selectedCountry])

    return (
        <div>
            <Search search={search} searchChangeHandler={searchChangeHandler} />
            <CountryList countries={filteredCountries} setSelectedCountry={setSelectedCountry} />
            <CountryDetails selectedCountry= {selectedCountry} />
            <Weather weather= {weather} />
        </div>
    )
}


export default App
