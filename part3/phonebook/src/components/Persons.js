import Button from "./Button";

const Persons = ({ persons, newFilter, deleteNumber }) => {
  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

  if ((newFilter !== "") & (filterPersons.length !== 0)) {
    return (
      <div>
        {filterPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <Button text="delale" onClick={deleteNumber} id={person.id} />
        </p>
      ))}
    </div>
  );
};

export default Persons;
