import React, { useEffect, useState } from 'react'
import Forecasts from '../components/Forecasts'
import { getWeather, getForecast } from '../api/openweather'
import Weather from '../components/Weather';
import moment from 'moment';
import { getCities } from '../api/cities';

const HomePage = () => {
  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState({})
  const [message, setMessage] = useState('Carico..')
  const [lastWeatherUpdate, setlastWeatherUpdate] = useState('')
  const [actualPosition, setActualPosition] = useState({})

  const updateLastUpdate = () => {
    const lastUpdate = localStorage.getItem('lastWeatherUpdate');
    setlastWeatherUpdate(lastUpdate);
  }

  const getActualPosition = () => {
    let position = localStorage.getItem('actualPosition');
    if(!position){
      position = JSON.stringify({
        name: 'Posizione attuale',
        lat: '',
        lon:''
      });
      localStorage.setItem('actualPosition', position);
    }
    let obj = JSON.parse(position);
    setActualPosition(obj);
    
    return obj    
  }

  const changePosition = async () => {
    setWeather({})
    let position = getActualPosition()
    const savedPositions = await getCities()
    const countIndexes = Object.keys(savedPositions).length
    if( countIndexes > 0){
      let obj = {}
      if(position.name == 'Posizione attuale'){
        obj = savedPositions[0]
        setGeoData(obj.lat, obj.lon)
      } 
      else {
        let cityIndex = savedPositions.findIndex(city => city.name === position.name)
        let lastIndex = cityIndex+1
        //last city
        if(lastIndex == countIndexes){
          obj = {
            name: 'Posizione attuale',
            lat: '',
            lon: ''
          }
          setBrowserPosition()
        } else {
          obj = savedPositions[lastIndex]
          setGeoData(obj.lat, obj.lon)
        }
      }
      localStorage.setItem('actualPosition', JSON.stringify(obj));
      setActualPosition(obj)
    } else {
      localStorage.setItem('actualPosition', JSON.stringify({
        name: 'Posizione attuale',
        lat: '',
        lon:''
      }));
      setBrowserPosition()
    }
  }

  const fetchDataWeather = async (data) => {
    const resWeather = await getWeather(data)
    localStorage.setItem('lastWeatherUpdate', moment(new Date()));
    updateLastUpdate()
    setWeather(resWeather)
  }

  const fetchDataForecast = async (data) => {
    const resForecast = await getForecast(data)
    setForecast(resForecast)
  }

  const setGeoData = (lat, lon) => {
    setMessage('Carico..')
    const geoData = {
      lat: lat,
      long: lon,
    }
    fetchDataWeather(geoData)
    fetchDataForecast(geoData)
  } 

  const getGeoPosition = () => {
    if (navigator.geolocation){
      navigator.geolocation. getCurrentPosition(function(position){
        setGeoData(position.coords.latitude, position.coords.longitude)
      }, function(err) {
        setWeather({})
        setMessage((err.code == 1) ? 'Attiva la posizione del browser' : err.message)
      }, {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 25000
      });
    }
  }

  const setBrowserPosition = () => {
    getGeoPosition()
    setInterval(() => {
      getGeoPosition()
    }, 3600000)
  }

  useEffect(()=>{
    let res = getActualPosition()
    if(res.name == 'Posizione attuale'){
      setBrowserPosition()
    } else {
      setGeoData(res.lat, res.lon)
    }
  },[])

  return (
    <div>
      {(Object.keys(weather).length > 0) ?
        <Weather 
          weather={weather} 
          lastWeatherUpdate={lastWeatherUpdate} 
          actualPosition={actualPosition}
          changePosition={changePosition}
        />
        : <span className='message'>{message}</span>
      }
      <div className='box-change-position' onClick={changePosition} >
        {actualPosition.name} 
        <span style={{marginLeft:'10px'}}>➔</span>
      </div>
      <Forecasts forecast={forecast} />
    </div>
  )
}

export default HomePage
