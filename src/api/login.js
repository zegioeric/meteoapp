import axios from 'axios'

export const loginUser = async (credentials) => {
  return await axios.post('http://localhost:8080/login', credentials).then(res => {
    return res.data
  })
}

