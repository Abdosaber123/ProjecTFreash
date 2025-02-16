import React from 'react'
import { Helmet } from 'react-helmet'
import img from '../assets/error.svg'

export default function Notfound() {
  return (
    <div className='flex justify-center mt-28'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found</title>
            </Helmet>
      <img src={img} className='lg:w-[60%]' alt="Not Found" />
    </div>
  )
}
