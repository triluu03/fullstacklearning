import { set } from 'mongoose'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='message'>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null 
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.personToShow.map(person => 
        <li key={person.id}>{person.name} {person.number} <button id = {person.id} value={person.name} onClick={props.onClick} type='button'>delete</button></li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])
  

// Add New Person
  const addPerson = (event) => {
    event.preventDefault()
    let test = true
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName.trim()){
        if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)){
          const newPerson = {
            name: newName.trim(),
            number: newNumber,
            id: persons[i].id,
          }
          personService
            .replace(newPerson.id, newPerson)
            .then(result => {
              setMessage(`Updated ${newPerson.name}'s number`)
              setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson))
            })
            .catch(error => {
              setError(`Information of ${newPerson.name} has already been removed from server`)
              setMessage(null)
            })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setTimeout(() => {
            setError(null)
          }, 3000)
        }
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

      personService
        .create(newPerson)
        .then(newOne => {
          console.log(newOne)
          setPersons(persons.concat(newOne))
          setNewName('')
          setNewNumber('')
        })
        .then(setMessage(`Added ${newPerson.name}`))
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }


// Handle Input
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


// Remove Person from the database
  const removePerson = (event)  => {
    if (window.confirm(`Delete ${event.target.value}?`)) {
      personService
        .remove(event.target.id)
        .then(setPersons(persons.filter(person => person.id != event.target.id)))
    }
  }


// Return frontend
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={error} />
      <Filter value={newSearch} onChange={handleSearch} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} value_name={newName} onChange_name={handleNameChange} value_number={newNumber} onChange_number={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} onClick={removePerson}/>
    </div>

  )
}

export default App
