const Numbers = ( {persons, newFilter} ) => {
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))
   
    if(newFilter !== '' & filterPersons.length !== 0){
        console.log('primer return')
        return (
            <div>
                {filterPersons.map((person) => (<p key={person.id}>{person.name} {person.number}</p>))} 
            </div>
        ) 
    }

    return (
        <div>
            {persons.map((person) => (<p key={person.id}>{person.name} {person.number}</p>))} 
        </div>
    )     
}

export default Numbers