import React from 'react'

import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Property from './pages/Property'
import Page from './pages/Page'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Login from './Components/Login'
import Signup from './Components/Signup'
import AddProperty from './Components/AddProperty'
import DisplayProperty from './Components/DisplayProperty'
import DashDisplay from './Dashboard/DashDisplay'
import DashProperty from './Dashboard/DashProperty'
import Order from './Components/Order'
import Message from './Dashboard/Message'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route  path='/' element={<Home/>}/>
          <Route path='/dashboard' element = {<DashDisplay/>}/>
          <Route  path='/page' element={<Page/>}/>
          <Route  path='/blog' element={<Blog/>}/>
          <Route  path='/contact' element={<Contact/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/addproperty' element={<AddProperty/>}/>
          <Route  path='/display' element={<DisplayProperty/>}/>
          <Route  path='/dashproperty' element={<DashProperty/>}/>
          <Route  path='/order' element={<Order/>}/>
          <Route  path='/messages' element={<Message/>}/>


    
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App