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

  const notificationMessage = (isError, text) => {
    if (isError === true) {
      setMessage({error: text});
    } else {
      setMessage(text);
    }
    setTimeout(() => {
        setMessage(null);
      }, 5000);
  }

  const addNumber = (event) => {
    event.preventDefault();

    const allName = persons.map((person) => person.name);
    const includesName = allName.includes(newName);

    if (!newName) return notificationMessage(true, `name missing`);
    if (newName.length < 3) return notificationMessage(true,`the name must have a minimum of 3 characters`);
    if (!newNumber) return notificationMessage(true,`number missing`);
    if (newNumber.length < 8) return notificationMessage(true,`the number must be 8 digits`);
    var regex = /\d/;
    if (regex.test(newName)) return notificationMessage(true, 'name must contain only letters')// true
    
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
          notificationMessage(false, `you have changed ${returnedPersons.name}'s number `);
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

    personService.create(personObject)
      .then((returnedPersons) => {
        notificationMessage(false, `Added ${returnedPersons.name}`);
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        if (error) {
          notificationMessage(true, error.response.data.error)
        }
      })
  };

  const deleteNumber = (event) => {
    const id = event.target.id;
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .erase(id)
        .then((returnedPersons) => {
          notificationMessage(false, `${returnedPersons.name} has been deleted`);
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch(error => {
          console.log(error)
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
