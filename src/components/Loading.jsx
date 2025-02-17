import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react'
// import { MagnifyingGlass } from 'react-loader-spinner';


export default function Loading() {
  return (
    
    <div className='flex justify-center fixed bottom-0 right-0 left-0 top-0 h-screen items-center z-20 bg-white '>
      {/* <MagnifyingGlass
      visible={true}
  height="210"
  width="1000%"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  /> */}
   <DotLottieReact
      src="https://lottie.host/2943e01a-5a55-4d7e-868d-ff11438fc203/dkpYRlvFcH.lottie"
      loop
      autoplay 
      speed={0.8}/>
    </div>
  )
}
