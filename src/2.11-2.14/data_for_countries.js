import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const Button = (props) => (
  <button onClick={props.handleClick} >Show</button>
)

const FindCountries = (props) => (
  <div>
    Find Countries: <input value={props.value} onChange={props.onChange} />
  </div>
)

const CountryList = ({ countries, setSearch }) => (
  <div><br />
    {countries.map(country => 
      <div key={country.ccn3}>
        {country.name.common} 
        <Button handleClick={() => setSearch(country.name.common)} />
      </div>
    )}
  </div>
)

const CountryData = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>

    <p>Capital: {country.capital} </p>
    <p>Area: {country.area} </p>

    <h3>Languages:</h3>
    <ul>
      {Object.entries(country.languages).map(([key, value]) => 
        <li key={key} >{value}</li>)
      }
    </ul>
    <img src={country.flags.png} alt="flag" />
  </div>
)

const DisplayCountries = ({ search, setSearch, countries }) => {

  const filteredArray = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())  
  )
  
  if (filteredArray.length === 1) {
    return <div>
        <CountryData country={filteredArray[0]} />
        <Weather city={filteredArray[0].capital} />
      </div>

  } else if (filteredArray.length > 1 && filteredArray.length <= 10) {
    return <CountryList countries={filteredArray} setSearch={setSearch} />

  } else if (filteredArray.length > 10) {
    return <p>Please be more specific...</p>

  } else return
}

const Weather = ({ city }) => {
  const [localWeather, setlocalWeather] = useState({ temp: 0, wind: 0, icon_src: '' })
  
  

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`) 
      .then(response => {
        const temp = Math.round(response.data.main.temp - 273)
        const wind = response.data.wind.speed
        const icon_src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        setlocalWeather({ temp, wind, icon_src })               
      })
  }, [city])

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temp: {localWeather.temp} Celcius</p>
      <img alt="icon" src={localWeather.icon_src}  />
      <p>Wind: {localWeather.wind} m/s</p>
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')                // state: user input
  const [allCountries, setAllCountries] = useState([])    // state: API country data
  
  
  const displaySearchValue = (e) => {
    setSearch(e.target.value)                             // sets search params from user input
  }


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')          // gets API data
      .then(response => {
        setAllCountries(response.data)                    // sets API data
      })
  }, [])

  return (
    <div>
      <FindCountries value={search} 
        onChange={displaySearchValue} 
      />
      <DisplayCountries search={search} setSearch={setSearch} countries={allCountries} />
    </div>
    
  )
}

export default App