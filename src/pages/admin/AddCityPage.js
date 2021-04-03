import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { addCity } from '../../api/cities'
import CityForm from '../../components/admin/CityForm';

const AddCityPage = () => {
  const history = useHistory()
  const [form, setForm] = useState({
    name: '',
    lat: '',
    lon: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const resCity = await addCity(form);
    history.push("/admin/dashboard/")
  }

  return (
    <Container>
      <h1>Aggiungi città</h1>
      <CityForm 
        handleSubmit={handleSubmit} 
        form={form} 
        setForm={setForm}
      />
    </Container>
  )
}


export default AddCityPage
