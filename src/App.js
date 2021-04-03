import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ApplicationRouter from './ApplicationRouter'

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationRouter />
    </BrowserRouter>
  )
}

export default App
