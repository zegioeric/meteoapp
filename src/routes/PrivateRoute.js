import React from 'react'
import { Route, useHistory } from 'react-router-dom'

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const history = useHistory()

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  if(!getToken()) {
    history.push('/login')
  }

  return (
    <Route
      {...rest}
      render={() => (
        <Layout getToken={getToken}><Component /></Layout>
      )}
    />    
  )
}

export default PrivateRoute
