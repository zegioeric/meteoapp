import { useState } from 'react';
import WeatherIcon from 'react-icons-weather';
import Moment from 'react-moment';
import '../css/Forecasts.css'

const Forecasts = ({forecast}) => {
  const [openClass, setOpenClass] = useState()

  const ForecastBoxes = () => {
    return(
      forecast.list.filter(function(element, index ){
        return index < 16;
      }).map( (forecastObj, index)=> (
        <div key={index} className='box'>
          <div className='contain-icon'>
            <WeatherIcon name="owm" iconId={forecastObj.weather[0].id.toString()} flip="horizontal" />
          </div>
          <div className='contain-text'>
            <p>
              <span><Moment date={forecastObj.dt_txt} format="DD/MM"/></span>
              <span> alle </span>
              <span><Moment date={forecastObj.dt_txt} format="HH:mm" /></span>
            </p>
            <p>{forecastObj.weather[0].description}</p>
          </div>
        </div>
      ))
    )
  }

  return (
    <div className={'container-forecasts '+openClass}>
      <div className='contain'>
        <h2>Previsioni</h2>
        {(Object.keys(forecast).length > 0) ?
          <ForecastBoxes />
          : 'Non ci sono previsioni'
        }
      </div>
      <div className='side'>
        <div className="hamburger" onClick={() => setOpenClass((openClass) ? '' : 'open')}>
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecasts;
