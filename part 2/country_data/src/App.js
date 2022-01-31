import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }
  useEffect(hook, [])

  


  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearch}/></div>
    </div>
  )
}

export default App
