import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Add from './pages/Add'
import Edit from './pages/Edit'
import View from './pages/View'

//--import './App.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  return (
    <>
    <ToastContainer />
     <BrowserRouter >
     <Routes>
      <Route path="/" element={<View/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        <Route path="*" element={<Error/>}></Route>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
