import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('new name')

  const addNumber = (event) => {
    event.preventDefault()
    
    const allName = persons.map(peroson => peroson.name)
    const includesName = allName.includes(newName)

    if(includesName) return alert(`${newName}  is already added to phonebook`)
    
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName}  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
    
  )
}

export default App