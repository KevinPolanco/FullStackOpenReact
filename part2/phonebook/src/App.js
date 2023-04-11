import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons  from './components/Persons '

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios 
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    
    const allName = persons.map(peroson => peroson.name)
    const includesName = allName.includes(newName)

    if(!newName) return alert(`name missing`)
    if(!newNumber) return alert(`number missing`)
    if(includesName) return alert(`${newName}  is already added to phonebook`)
    if(newNumber.length < 8) return alert(`the number must be 8 digits`)

    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    axios 
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.trim())
    console.log(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      
      <h3>add a new person</h3>
      <PersonForm 
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
    
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
    
  )
}

export default App