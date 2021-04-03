import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { getCity, editCity } from '../../api/cities'
import CityForm from '../../components/admin/CityForm';


const EditCityPage = () => {
  const history = useHistory()
  const { id } = useParams()
  const [form, setForm] = useState({})
 
  const fetchDataCity = async () => {
    const resCity = await getCity(id)
    setForm(resCity)
  }

  const handleSubmit = async e => {
    e.preventDefault(); 
    await editCity(form, id);
    history.push("/admin/dashboard/")
  }

  useEffect(() => {
    fetchDataCity()
  }, [])

  return (
    <Container>
      <h1>Modifica {form.name}</h1>
      <CityForm 
        handleSubmit={handleSubmit} 
        form={form} 
        setForm={setForm}
        />
    </Container>
  )
  
}
export default EditCityPage
