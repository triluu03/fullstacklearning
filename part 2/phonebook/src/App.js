import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>name: <input value={props.value_name} onChange={props.onChange_name} /></div>
        <div>number: <input value={props.value_number} onChange={props.onChange_number} /></div>
        <div><button type='submit'>add</button></div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.personToShow.map(person => 
        <li key={person.id}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '39-44-5323523', id: 1},
    {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    {name: 'Mary Poppendieck', number: '39-23-6423122', id: 3},
    {name: 'Dan Abramov', number: '39-23-6423122', id: 4}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    let test = true
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName.trim()){
        window.alert(newName.trim() + " is already added to phonebook")
        test = false
        setNewName('')
        setNewNumber('')
      }
    }
    if (test) {
      const newPerson = {
        name: newName.trim(),
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearch} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} value_name={newName} onChange_name={handleNameChange} value_number={newNumber} onChange_number={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>

  )
}

export default App
