import moment from "moment";
import { Card } from "semantic-ui-react";

const WeatherCard = (props) => {
  return (
    <Card className="weather-card">
      <Card.Content className="result">
        <Card.Header>
          <span className="cityname">
            {props.data.data.name}, {props.data.data.sys.country}
          </span>
        </Card.Header>

        <Card.Meta>{moment().format("LLLL")}</Card.Meta>
        <img
          src={`http://openweathermap.org/img/wn/${props.data.data.weather[0].icon}@4x.png`}
          alt={"Icon from Open Weather Api"}
        />
        <Card.Description>
          Description:
          <span className="data">{props.data.data.weather[0].description}</span>
          <br />
          Temperature:
          <span className="data">
            {props.data.data.main.temp} <sup>o</sup>F
          </span>
          <br />
          Feels Like:
          <span className="data">
            {props.data.data.main.feels_like} <sup>o</sup>F
          </span>
          <br />
          Humidity:
          <span className="data">{props.data.data.main.humidity}%</span>
          <br />
          Wind: <span className="data">{props.data.data.wind.speed} mph</span>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default WeatherCard;
