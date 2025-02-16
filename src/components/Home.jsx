import React, { useContext } from 'react'
import HomeProducts from './HomeProducts'
import HomeSlider from './HomeSlider'
import Gatagores from './Gatagores'
import { Helmet } from 'react-helmet'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'
import { userToken } from './Context/UserTokenPorvider';

export default function Home() {
  let {isLogin} = useContext(userToken)
  let navi = useNavigate()
  if(isLogin == null){
    navi('/login')
  }

  

  
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
