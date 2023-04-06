import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons  from './components/Persons '

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: 56842364, id: 1 },
    { name: 'Ada Lovelace', number: 53864127, id: 2 },
    { name: 'Mary Poppendieck', number: 86759214, id: 3 },
    { name: 'Dan Abramov', number: 53889632, id: 4 },
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

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
      id: persons.length + 1,
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
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