import React from 'react'
import { Switch } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateLayout from './components/PrivateLayout'
import OnlyPublicRoute from './routes/OnlyPublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AddCityPage from './pages/admin/AddCityPage'
import EditCityPage from './pages/admin/EditCityPage'

const ApplicationRouter = () => {
  return (
    <Switch>
      <OnlyPublicRoute exact path='/' component={HomePage} layout={Layout} />
      <OnlyPublicRoute exact path='/login' component={LoginPage} layout={Layout} />
      <PrivateRoute exact path='/admin/dashboard' component={DashboardPage} layout={PrivateLayout} />
      <PrivateRoute exact path='/admin/city/add' component={AddCityPage} layout={PrivateLayout} />
      <PrivateRoute path='/admin/city/edit/:id?' component={EditCityPage} layout={PrivateLayout} />
    </Switch>
  )
}

export default ApplicationRouter
