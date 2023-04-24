require('dotenv').config()
const express = require("express");
const app = express();
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json());
app.use(cors())
app.use(express.static('build'))

app.use(morgan('tiny'))
morgan.token('body', (request) => JSON.stringify(request.body))

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendick",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

const getRandomInt = () => {
  return Math.floor(Math.random() * 1000000000);
};

app.get("/info", (request, response) => {
  const date = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateString =
    date
      .toLocaleString("en-US", {
        timeZone,
        timeZoneName: "short",
      })
      .replace(/,/g, "") +
    " " +
    date.toString().match(/\(([^)]+)\)/)[1];

  response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${dateString}</p>
    `);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) response.status(404).end();
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", morgan(':body'), (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const names = persons.map((person) => person.name);
  const nameIncludes = names.includes(body.name);
  
  if (nameIncludes) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(),
  };

  response.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
