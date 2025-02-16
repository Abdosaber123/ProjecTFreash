import React from 'react'
import HomeProducts from './HomeProducts'
import HomeSlider from './HomeSlider'
import Gatagores from './Gatagores'
import { Helmet } from 'react-helmet'
import Footer from './Footer';

export default function Home() {
  return (
    <div className=' py-20'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
      <HomeSlider></HomeSlider>
      <Gatagores/>
      <HomeProducts/>
      <Footer></Footer>
    </div>
  )
}
