import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: 56842364, id: 1 },
    { name: 'Ada Lovelace', number: 53864127, id: 2 },
    { name: 'Mary Poppendieck', number: 86759214, id: 3 },
    { name: 'Dan Abramov', number: 53889632, id: 4 },
  ]) 

  const [ newName, setNewName ] = useState('new name')
  const [ newNumber, setNewNumber ] = useState('new number')
  const [ newFilter, setNewFilter ] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    
    const allName = persons.map(peroson => peroson.name)
    const includesName = allName.includes(newName)

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
      <div>filter shown with<input onChange={handleFilterChange}/></div>

      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName}  onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} newFilter={newFilter}/>
    </div>
    
  )
}

export default App