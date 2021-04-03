import axios from 'axios'

export const getCities = async () => {
  return await axios.get('http://localhost:8080/cities').then(res => {
    return res.data
  })
}

export const getCity = async (id) => {
  return await axios.get(`http://localhost:8080/city/${id}`).then(res => {
    return res.data
  })
}

export const addCity = async (data) => {
  return await axios.post('http://localhost:8080/city', data).then(res => {
    return res.data
  })
}

export const editCity = async (data, id) => {
  return await axios.put(`http://localhost:8080/city/${id}`, data).then(res => {
    return res.data
  })
}

export const deleteCity = async (id) => {
  return await axios.delete(`http://localhost:8080/city/${id}`).then(res => {
    return res.data
  })
}

export const getJsonCities = async (name) => {
  return await axios.get(`http://localhost:8080/jsoncities/${name}`).then(res => {
    return res.data
  })
}