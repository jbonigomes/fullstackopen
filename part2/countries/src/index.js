import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data)
    })
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
            </>
          )}
        </>
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
