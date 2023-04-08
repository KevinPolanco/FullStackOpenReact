import {useEffect, useState} from 'react'
import axios from 'axios'
import FindCountries from './components/FindCountries'
import Content from './components/Content'

const App = () =>{
  const [ countries, setCountries ] = useState([])
  const [ findCountries, setFindCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFindCountries(event.target.value.trim().toLowerCase())
  }

  //  console.log(findCountries)
  const filterCountres = countries.filter( country => country.name.common.toLowerCase().includes(findCountries) )
  
  return (
    <div>
      <FindCountries handleFilterChange={handleFilterChange} />
      <Content filterCountres={filterCountres}/>
    </div>
  );
}

export default App;
