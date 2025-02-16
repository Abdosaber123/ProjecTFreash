import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'

export default function Brand() {

  function getBrand (){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data , isLoading , isError} = useQuery({
    queryKey:['brands'],
    queryFn:getBrand
  })
  // console.log(data?.data?.data);
  //DETAILS 
  let {id} = useParams
  async function getDetails(id){
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
 if(isLoading)
  return <Loading></Loading>
        
  function hi (){
    console.log('hi');
    
  }
  return (
      <div className='container'>
          
        
        <h1 className='mt-36 font-bold text-6xl text-green-500 text-center'>All Brands</h1>
          {data?.data?.data.map(elm=>
          <Link to={`/prandDetails/${elm._id}`} className="">
             <button  className='w-1/2  lg:w-1/3 p-3'>
            <div className="mt-24 md:mt-24 flex lg:mt-20 flex-col items-center hover:border-2 p-5 gap-5    rounded-md transition-all border-yellow-300">
            <img src={elm.image} className='w-full' alt="" />
            <p className='text-[20px] font-bold'>{elm.name}</p>
            
            </div>
             
           
          </button>
            </Link>
            )}
          
      </div>
  )
}




