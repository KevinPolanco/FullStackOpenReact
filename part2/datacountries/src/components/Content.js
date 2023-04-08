import Languages from "./Languages"
import Button from "./Button"

const Content = ({ filterCountres, handleButtonClick }) => {
    
    if(filterCountres.length > 10){
        return (
            <>
                <p>Too many matches, specify another</p>
            </>
        )  
    }
    
    if(filterCountres.length <= 10 && filterCountres.length > 1){
        return (
            <>
                {filterCountres.map(country => (
                    <>
                        <p>{country.name.common}</p>
                        <Button className={country.name.common} onClick={handleButtonClick} text='show'/>
                    </> 
                ))}
            </>
        )  
    }

    if(filterCountres.length === 1){
        return (
            <>
                {filterCountres.map(country => (
                    <>
                        <h2>{country.name.common}</h2>
                        <p>Capital {country.capital}</p>
                        <p>Populaton {country.population}</p>
                        <Languages languages= {country.languages}/>
                        <img src={country.flags.png} alt={country.flags.all} />
                    </>
                ))}
            </>
        )  
    }

    return (
        <>
            
        </>
    )  
}

export default Content