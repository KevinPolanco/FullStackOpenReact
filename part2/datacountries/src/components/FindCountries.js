const FindCountries = ({ handleFilterChange }) => {
   
    return (
        <div>
            find countries <input onChange={handleFilterChange}/>
        </div>
    )  
};

export default FindCountries