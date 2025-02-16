import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  let [isLoading , setLoading] = useState(false)
let Navigae = useNavigate()
 async function reset(email){
   setLoading(true)
    try {
      let {data , isLoading } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email)
    // console.log(email);
    console.log(data);
    console.log(data.statusMsg);
    if(data.statusMsg =='success')
      Navigae('/verialcode')
    if(data.message)
      toast.success(data.message)
    } catch (error) {
      console.log(error?.response?.data?.message);
      setLoading(false)
      if(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
    }

    
  }

  
  if(isLoading)
    <Loading></Loading>
    
   let formik = useFormik({
       initialValues: {
         email: "",
       },
       onSubmit: reset,
     });
  
     if(isLoading)
      <Loading></Loading>
  
  return (
    <div className='py-32 container w-[70%]'>
      <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center flex-col ">
      <p className='text-2xl font-bold mb-2'>Enter Your Email</p>
      <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='rounded-2xl py-5' placeholder='Email' />
      <button type='submit' className='text-[#198754] mt-5 border-2 w-fit py-3 border-yellow-300 rounded-2xl px-5 hover:text-white hover:bg-[#198754] transition-all  '>
      {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : 'Send'}
      </button>
      </div>
      </form>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
    </div>
  )
}
