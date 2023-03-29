import { useState } from 'react'

const WeatherForm = (props) =>{
  //state changes when user inputs city name. By default it is empty
  const [city, setCity] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit (city);
  };

  const onChange = (e) => {
    setCity(e.target.value);
  }



    return (
        <div className="weather">
        {/* <h1 className="App-header">Anneice's Weather App</h1> */}
        <form onSubmit={handleSubmit}>
          <input
            id="city-name"
            type="text"
            placeholder="City Name"
            name="city"
            onChange={onChange}
            value={city}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default WeatherForm;