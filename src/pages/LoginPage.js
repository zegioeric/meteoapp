import React, { useState } from 'react'
import { Container, Form, Button, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { loginUser } from '../api/login'
  
const LoginPage = () => {
  const history = useHistory()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  const handleSubmit = async e => {
    e.preventDefault(); 
    const res = await loginUser({
      email,
      password
    });
    
    if(res.token){
      setToken(res);
      history.push('/admin/dashboard')
    } else {
      setError(<div>email/password errati</div>)
    }
  }

  return (
    <Container>
      <div style={{paddingTop: '15%', 'margin': '0 auto', width: '250px'}}>
        <Row>
          <h1>Login</h1>
        </Row>
        <Row>
          <p><span>Utente: </span><span>admin@mail.com</span><span> / </span>password<span></span></p>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            {error}
            <Button variant="primary" type="submit">
              Accedi
            </Button>
          </Form>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Link to="/">Torna al Sito</Link>
        </Row>
      </div>
    </Container>
  )
}


export default LoginPage
