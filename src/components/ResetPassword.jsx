import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
let Navigate = useNavigate()
    async function reset(email){
        try {
          let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,email)
        console.log(email.email);
        // console.log(data.token);
        // console.log(data);
        // console.log(formik.values.email);
        
        // console.log(data.data.response.data.message);   
        // console.log(email.email);
        // Navigate('/')
        setLogin(data.token) 
            console.log('hi token');
            
            localStorage.setItem('token' , data.token)
            Navigate('/')
            toast.success('Success Reset The Password')
        
        // if(formik.values.email === email.email){
        //     setLogin(data.token) 
        //     console.log('hi token');
            
        //     localStorage.setItem('token' , data.token)
        //     Navigate('/')
        //     toast.success('Success Reset The Password')
            
        //   }
        
        } catch (error) {
          console.log(error.response.data.message);
          if(error.response.data.message)
            return toast.error('Check Your Email')

        }
        
      }
      
      
     let formik = useFormik({
           initialValues: {
             email: "",
             newPassword : "",
           },
           onSubmit: reset,
         });
        //  console.log(formik.values.email);
         
         
  return (
    <div className='py-32 container w-[70%]'>
      <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center flex-col ">
      <p className='text-2xl font-bold mb-2'>reset your account password
      </p>
      <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='email' className='rounded-2xl py-5' placeholder='Enter Your Email' />
      <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='newPassword' className='rounded-2xl py-5 mt-4' placeholder='Enter New Password..' />
      <button type='submit' className='text-[#198754] mt-5 border-2 w-fit py-3 border-yellow-300 rounded-2xl px-5 hover:text-white hover:bg-[#198754] transition-all  '>Verial</button>
      </div>
      </form>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>
    </div>
  )
}
