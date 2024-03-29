require("dotenv").config();
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
// app.use(express.static("build"));

app.use(morgan("tiny"));
morgan.token("body", (request) => JSON.stringify(request.body));


app.get("/", (request, response) => {
  response.json("Hello");
});

app.get("/info", (request, response) => {
  const date = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateString =
    date
      .toLocaleString("en-US", {
        timeZone,
        timeZoneName: "short",
      })
      .replace(/,/g, "") + " " + date.toString().match(/\(([^)]+)\)/)[1];

  Person.find({}).then((person) => {
    response.send(`
          <p>Phonebook has info for ${person.length} people</p>
          <p>${dateString}</p>
        `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((person) => {
      response.json(person);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", morgan(":body"), (request, response, next) => {
  const body = request.body;
   
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatePerson) => {
      response.json(updatePerson);
    })
    .catch((error) => next(error));
});

////////////////////////////////////////////////////////////

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error("ERROR MESSAGE", error.message);
  console.error("ERROR NAME", error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
