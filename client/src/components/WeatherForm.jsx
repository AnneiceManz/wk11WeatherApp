import { useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";

const WeatherForm = (props) => {
  //state changes when user inputs city name. By default it is empty
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(city);
  };

  const onChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <Card className="weather">
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            id="city-name"
            type="text"
            placeholder="City Name"
            name="city"
            onChange={onChange}
            value={city}
            required
          />
          <Button color="purple">Submit</Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default WeatherForm;
