import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import img from '../assets/light-patten.svg'

export default function Layout() {
 
  return (
    <div className='flex flex-col  justify-center' style={{backgroundImage:`url(${img})`}}>
      <Navbar/>
      <Outlet/>
      
    </div>
  )
}
