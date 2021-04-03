import React, { useEffect, useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap';
import { Hint } from 'react-autocomplete-hint';
import { getJsonCities } from '../../api/cities'

const CityForm = ( { handleSubmit, form, setForm } ) => {
  const [errors, setErrors] = useState({})
  const [hintData, setHintData] = useState([])
  const [cityController, setCityController] = useState(form.name)
  const [jsonCities, setJsonCities] = useState([])

  const insertCoord = (coordinate, formName) => {
    setForm({
      ['name']: formName,
      ['lat']: coordinate.lat,
      ['lon']: coordinate.lon,
    })
  }

  const getData = async (formName) => {
    const resJsonCities = await getJsonCities(formName)
    var hintArray = []
    setJsonCities(resJsonCities)
    resJsonCities.map(res => {
      hintArray.push(res.name)
      setCityController(res.name)
      insertCoord(res.coord, formName)
    })
    setHintData(hintArray)
  }

  const validateForm = () => {
    //validate handle react / react hook / yup / ..
    for (const [key, value] of Object.entries(form)) {
      if(!value){
        setErrors({ [key]: "required*"})
        return false
      } 
    }
    return true
  }

  const handleClick = (target) => {
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  const handleChange = async (target) => {
    setForm({
      ...form,
      [target.name]: target.value
    })

    if(target.name == 'name'){
      let value = target.value.charAt(0).toUpperCase() + target.value.slice(1);
      if(value.length > 3){
        await getData(value)
      } else {
        insertCoord({
          lat:'',
          lon: ''
        }, value)
        setHintData([])
      }
    }
  }

  const changeCity = (city) => {
    var hintArray = []
    jsonCities.map(res => {
      if(city == res.name){
        hintArray.push(res.name)
        setCityController(res.name)
        insertCoord(res.coord, res.name)
      }
    })
  }

  const Cities = () => {
    return(
      hintData.map( (city, index) => (
        <span key={index} onClick={()=> changeCity(city) }>
          {city}
        </span>
        )
      )
    )
  }

  const submitForm = e => {
    e.preventDefault();
    form.name = cityController
    if(validateForm(form)){
      handleSubmit(e, {...form})
    }
  }

  useEffect(() => { 
    setCityController(form.name)
  }, [form.name])

  return(
    <Form style={{marginTop: '50px'}}>
      <Form.Row>
        <Form.Group as={Col} md={4} xs={12} controlId="GridName">
          <Form.Label>Nome Città*</Form.Label>
          <Hint options={hintData} allowTabFill>
            <input className='input-with-hint form-control'
              value={form.name}
              name="name"
              onChange={e => handleChange(e.target)}   
              onClick={e => handleClick(e.target)}   
              />
          </Hint>
          
          <p>{errors.name}</p>
        </Form.Group>
        <Form.Group as={Col} md={4} xs={12} controlId="GridLat">
          <Form.Label>Latitudine*</Form.Label>
          <Form.Control placeholder="Latitudine" name="lat" value={form.lat} 
          disabled
          onChange={e => handleChange(e.target)}
           />
          <p>{errors.lat}</p>
          <p style={{marginTop: '5px'}}>{cityController}</p>
          <hr />
          <div className='cities-map'>
            <Cities />
          </div>
        </Form.Group>
        <Form.Group as={Col} md={4} xs={12} controlId="GridLon">
          <Form.Label>Longitudine*</Form.Label>
          <Form.Control placeholder="Longitudine" name="lon" value={form.lon} 
          disabled
          onChange={e => handleChange(e.target)}
           />
          <p>{errors.lon}</p>
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="button" onClick={submitForm}>
        Salva
      </Button>
    </Form>  
    )
}

export default CityForm
