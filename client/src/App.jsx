import './App.css';
import { useState } from "react";
import { Card } from 'semantic-ui-react'
import WeatherForm from './components/weatherForm';
import WeatherCard from './components/weatherCard';
import WeatherHeader from './components/Header';
import UserForm from './components/Form'

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  //A function to do the get request and set the state from the hard code data
  const loadCity = (city) => {
    const params = new URLSearchParams({ cityName: city });
    fetch(`http://localhost:8080/api/weather?${params}`)
      .then((response) => response.json())
      .then((result) => {
        //console.log(result)
        setCity(city);
        setResult(result);
      });
  }

 const handleSubmit = (city) =>{
  // e.preventDefault();
  loadCity(city);
 }


  return (
    <div className="App">
      <WeatherHeader />
      <Card.Group itemsPerRow={2} className='cardgroup'>

<UserForm />
      <WeatherForm city={city} handleSubmit={handleSubmit}/>
      {!result ? null : <WeatherCard data={result} /> }
      </Card.Group>
    </div>
  );
}

export default App;