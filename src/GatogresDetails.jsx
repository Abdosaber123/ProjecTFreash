import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

export default function GatogresDetails() {
    let {id } = useParams()

    function GategoresDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      }
      let {data} = useQuery({
        queryKey:['gatogres'] ,
        queryFn:GategoresDetails
      })
      console.log(data?.data?.data);
  return (
    <div className='py-20 mt-9 text-center'>
      <Link to={'/gatagores'} className='py-2 font-medium   bg-black text-white text-2xl rounded-lg mt-9 px-3 '> Go Back</Link>
        <div className="flex justify-center items-center flex-col">
        <div className="border-2  mt-9 border-yellow-400 shadow-2xl px-16">
        <img className='w-[300px]' src={data?.data?.data?.image} alt="" />
        <p className='text-3xl text-center border-t-2 border-black pt-3 mt-3 mb-5 text-yellow-400'>{data?.data?.data?.name}</p>
        </div>
        </div>
    </div>
  )
}
