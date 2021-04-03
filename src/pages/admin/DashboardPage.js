import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { getCities, deleteCity } from '../../api/cities'
import TableList from '../../components/admin/TableList'

const DashboardPage = () => {
  const [cities, setCities] = useState([]);

  const fetchDataCities = async () => {
    const resProdutcs = await getCities()
    setCities(resProdutcs)
  }

  const removeCity = async (id) => {
    await deleteCity(id)
    window.location.reload()
  }

  useEffect( () => {
    fetchDataCities()
  }, [])

  return (
    <Container>
      <h1>Lista Città</h1>
      <Row className='mt-40'>
        <TableList cities={cities} removeCity={removeCity} />
      </Row>
    </Container>
  )
  
}
export default DashboardPage
