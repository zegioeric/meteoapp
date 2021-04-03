import axios from 'axios'
const ENDPOINT_WEATHER = '//api.openweathermap.org/data/2.5/weather';
const ENDPOINT_FORECAST = '//api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'bd84d98d30841d5669d443eac854e864'

export const getWeather = async (data) => {

    const params = {
      appid: API_KEY,
      lang: 'it',
      units: 'metric',
      lat: data.lat,
      lon: data.long
    };
  
    return await axios.get(ENDPOINT_WEATHER, { params }).then(res => {
      return res.data
    })
}

export const getForecast = async (data) => {

    const params = {
      appid: API_KEY,
      lang: 'it',
      units: 'metric',
      lat: data.lat,
      lon: data.long
    };
  
    return await axios.get(ENDPOINT_FORECAST, { params }).then(res => {
      return res.data
    })
  }
  

  

