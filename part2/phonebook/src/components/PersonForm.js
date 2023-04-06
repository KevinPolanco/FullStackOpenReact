const PersonForm = ({addNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={addNumber}>
        <div>name: <input placeholder="new name" value={newName}  onChange={handleNameChange}/></div>
        <div>number: <input placeholder="new number" value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
