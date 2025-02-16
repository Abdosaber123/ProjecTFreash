import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'

export default function GategoresPage() {
 
    async function getGategores (){
           return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      }
      let {data , isPending , isLoading} = useQuery({
        queryKey:['gategores'],
        queryFn:getGategores,
    
      })
      console.log(data?.data?.data);
      if (isPending)
          return <Loading></Loading>;
  return (
    <div className='container '>
        <div className="flex lg:ml-36 lg:justify-start justify-center gap-4 flex-wrap mt-28 ">
        {data?.data?.data.map(prdo=> 
            <Link to={`/gatagores/${prdo._id}`} className='w-1/3 lg:w-1/4 lg:flex-col    '>
                <div className=" border-2 rounded-2xl hover:shadow-2xl ">
                <img src={prdo.image} className='h-[300px]  w-full object-cover' alt="" />
                <p className='py-5 text-center text-2xl text-[#C89167] font-bold border-t-2'>{prdo.name}</p>
                </div>
            </Link>
        )}
        </div>
    </div>
  )
}
