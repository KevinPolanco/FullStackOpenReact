import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();

    const allName = persons.map((person) => person.name);
    const includesName = allName.includes(newName);

    if (!newName) return alert(`name missing`);
    if (!newNumber) return alert(`number missing`);
    if (newNumber.length < 8) return alert(`the number must be 8 digits`);

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (includesName) {
      const person = persons.find((person) => person.name === newName);
      const id = person.id;
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(id, personObject).then((returnedPersons) => {
          setMessage(`you have changed ${returnedPersons.name}'s number `);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPersons
            )
          );
          setNewName("");
          setNewNumber("");
        });
      }
      return;
    }

    personService.create(personObject).then((returnedPersons) => {
      setMessage(`Added ${returnedPersons.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setPersons(persons.concat(returnedPersons));
      setNewName("");
      setNewNumber("");
    });
  };

  const deleteNumber = (event) => {
    const id = event.target.id;
    console.log(id)
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .erase(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch(error => {
          if (error) {
            setMessage({
              error: error.response.statusText,
              person,
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          }
        })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.trim().toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />

      <h3>add a new person</h3>
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deleteNumber={deleteNumber}
      />
    </div>
  );
};

export default App;
