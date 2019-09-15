import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ weather, setWeather ] = useState(null)
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => setCountries(res.data))
  }, [])

  const handleSearch = (e) => {
    setWeather(null)
    setSearch(e.target.value)
  }

  const handleShow = (country) => () => {
    setSearch(country)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredCountries.length === 1 && !weather) {
    const query = `query=${filteredCountries[0].capital}`
    const key = 'access_key=5b573d26e245bda8442bf3a982c41b6a'

    axios
      .get(`http://api.weatherstack.com/current?${key}&${query}`)
      .then((res) => setWeather(res.data.current))
  }

  return (
    <>
      {countries.length ? (
        <>
          <div>
            <label>find countries</label>
            <input type="text" value={search} onChange={handleSearch} />
          </div>

          {(search && filteredCountries.length) && (
            <>
              {filteredCountries.length > 9 ? (
                <div>Too many matches, specify another filter</div>
              ) : (search && filteredCountries.length > 1) ? (
                <>
                  {filteredCountries.map((country) => (
                    <div key={country.alpha2Code}>
                      {country.name}
                      <button onClick={handleShow(country.name)}>Show</button>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h2>{filteredCountries[0].name}</h2>
                  <div>capital {filteredCountries[0].capital}</div>
                  <div>population {filteredCountries[0].population}</div>
                  <h3>languages</h3>
                  <ul>
                    {filteredCountries[0].languages.map((language) => (
                      <li key={language.iso639_1}>{language.name}</li>
                    ))}
                  </ul>
                  <img src={filteredCountries[0].flag} width="100" alt="flag" />
                  <h3>Weather in {filteredCountries[0].name}</h3>
                  {weather ? (
                    <>
                      <div>
                        <b>temperature: </b> {weather.temperature} Celsius
                      </div>
                      <div>
                        <img alt="icon" src={weather.weather_icons[0]} />
                      </div>
                      <div>
                        <b>wind: </b>
                        {weather.wind_speed} kph direction {weather.wind_dir}
                      </div>
                    </>
                  ) : (
                    <div>Loading weather...</div>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <div>Loading countries...</div>
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
