import React from "react";
import { Image, Header } from "semantic-ui-react";
import rainbowweather from '../assets/rainbowweather.jpg'

const WeatherHeader = () => {
  return (
    <div>
      <Header color="purple" as='h1'>
        <Image circular src={rainbowweather} />Weather App
      </Header>
    </div>
  );
};

export default WeatherHeader;
