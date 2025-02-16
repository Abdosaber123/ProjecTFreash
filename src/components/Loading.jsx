import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner';


export default function Loading() {
  return (
    <div className='fixed bottom-0 right-0 left-0 top-[65px] flex justify-center z-10 items-center bg-black opacity-50'>
      <MagnifyingGlass
      visible={true}
  height="80"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
    </div>
  )
}
