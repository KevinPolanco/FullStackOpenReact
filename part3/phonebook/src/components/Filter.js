const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input
        placeholder="new filter"
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
