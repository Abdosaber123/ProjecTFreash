import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

export default function PrandDetails() {
    let {id } = useParams()

    function getDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      }
      let {data} = useQuery({
        queryKey:['brand'] ,
        queryFn:getDetails
      })
      console.log(data?.data?.data);
  return (
    <div className='py-20 mt-9 text-center'>
      <Link to={'/prands'} className='py-2 font-medium   bg-black text-white text-2xl rounded-lg mt-9 px-3 '> Go Back</Link>
        <div className="flex justify-center items-center flex-col">
        <div className="border-2 mt-40 border-yellow-400 shadow-2xl">
        <img className='w-[500px]' src={data?.data?.data?.image} alt="" />
        <p className='text-3xl text-center mb-10 text-yellow-400'>{data?.data?.data?.name}</p>
        </div>
        </div>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Prand Details</title>
      </Helmet>
    </div>
  )
}
