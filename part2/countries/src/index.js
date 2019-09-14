import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    const init = async () => {
      const key = 'access_key=cc3d8931e6fe66668440ee71ff21ef10'
      const countriesUrl = 'https://restcountries.eu/rest/v2/all'
      const weatherUrl = `http://api.weatherstack.com/current?${key}`

      const countries = (await axios.get(countriesUrl)).data

      for (let i = 0; i < countries.length; i++) {
        const query = `query=${countries[i].capital}`
        const weather = await axios.get(`${weatherUrl}&${query}`)
        countries[i].weather = weather.current
      }

      setCountries(countries)
    }

    init()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleShow = (country) => () => {
    setSearch(country)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )

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
                      <li>{language.name}</li>
                    ))}
                  </ul>
                  <img src={filteredCountries[0].flag} width="100" alt="flag" />
                  {filteredCountries[0].weather && (
                    <>
                      <h3>Weather in {filteredCountries[0].name}</h3>
                      <div>
                        <b>temperature: </b>
                        {filteredCountries[0].weather.temperature} Celsius
                      </div>
                      <div>
                        <img
                          alt="icon"
                          src={filteredCountries[0].weather.weather_icons[0]}
                        />
                      </div>
                      <div>
                        <b>wind: </b>
                        {filteredCountries[0].weather.wind_speed} kph {' '}
                        direction {filteredCountries[0].weather.wind_dir}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
