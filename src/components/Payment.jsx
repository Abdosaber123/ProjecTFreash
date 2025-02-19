import React, { useContext, useState } from 'react'
import { PaymenOnline } from './Hooks/payment'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import * as motion from "motion/react-client"
import { CartContext } from './Context/CartContext'
import { Helmet } from 'react-helmet'


export default function Payment() {

  const { cartId } = useContext(CartContext);

  let { mutate, data } = useMutation({ mutationFn: PaymenOnline });

  function hundelPayment(shippingAddress) {
    mutate({ cartId, shippingAddress });
  }

  if (data?.data?.status === 'success')
    window.location.href = data?.data?.session?.url

  let Formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit: hundelPayment
  })
  return (
    <div className="container">
      <div className="paymentPage flex h-screen lg:h-[700px] items-center justify-center flex-col">
        <motion.div
        // initial={{ opacity: 0, scale: 0 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{
        //     duration: 0.6,
        //     scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        // }}
        >
          <h2 className='text-3xl py-10 text-green-500'>Shapping Address:</h2>
          <form onSubmit={Formik.handleSubmit}>
            <div className="flex flex-col">
              <label className='mb-1' for='details'>Details:</label>
              <input className='rounded-2xl md:w-[500px]' type="text" value={Formik.values.details} onChange={Formik.handleChange} id='details' />
            </div>
            <div className="mt-5 flex flex-col">
              <label className='mb-1' for='city'>city:</label>
              <input className='rounded-2xl' type="text" value={Formik.values.city} onChange={Formik.handleChange} id='city' />
            </div>

            <div className="mt-5 flex flex-col">
              <label className='mb-1' for='phone'>phone:</label>

              <input className='rounded-2xl' type="number" value={Formik.values.phone} onChange={Formik.handleChange} id='phone' />
            </div>
            <div className="flex justify-center">
            <button type='text' className='p-3 bg-green-600 rounded-2xl mt-4'>Submit</button>
            </div>
          </form>
        </motion.div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payemnt Page</title>
      </Helmet>
    </div>
  )
}
