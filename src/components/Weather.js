import { useState } from 'react';
import WeatherIcon from 'react-icons-weather';
import AnimationText from '../components/AnimationText'
import Moment from 'react-moment';
import '../css/Weather.css'

const Weather = ({weather, lastWeatherUpdate}) => {
  const [icon] = useState(weather.weather[0].id.toString())
  const [description] = useState(weather.weather[0].description)
  const [temp] = useState(Math.floor(weather.main.temp))

  return (
    <div className='container-weather' >
      <div className='contain'>
        <div className='first-box'>
          <WeatherIcon name="owm" iconId={icon} flip="horizontal" />
          <span>{temp}°C</span>
        </div>
        <div className='second-box'>
          <span>Oggi a</span>
          <strong> {weather.name} </strong>
          <span>c'è</span>
          <strong> <AnimationText text={description} /> </strong>
        </div>
        <div className='third-box'>
          <span>Ultimo aggiornamento <Moment date={lastWeatherUpdate} format="DD-MM-YYYY, HH:mm:ss" /></span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
