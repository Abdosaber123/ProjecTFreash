import React, { useContext, useEffect, useState } from 'react'
import { userToken } from './Context/UserTokenPorvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Orders() {
  let [isOpen, setOpen] = useState(false)
  const { userId } = useContext(userToken);
  const [orders, setOreder] = useState([])

  async function getOrder() {
    await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then(({ data }) => {

       

        setOreder(data)

      })
  }
  useEffect(() => {
    getOrder()
  }, [])
  
 
  return (
    <div className='mt-36'>
      <div className="container">
        
        {/* {orders.map((ordr)=> (
          ordr.map((cart) => (<div>
              <p></p>
          </div>))

        ))} */}
        {orders.map((ordr) => <div>
          
          <div className=" flex-col items-center justify-center flex  ">
            <div className="border-2 p-5 mt-2 rounded-3xl">
              <h1 className='text-3xl font-bold text-center mb-3 text-violet-400 '> Your Data Account  </h1>
              <p className='text-2xl font-medium text-yellow-500'> <span className='text-xl font-bold text-black'>Your Name</span> : {ordr.user.name}</p>
              <p className='text-2xl font-medium text-yellow-500'> <span className='text-xl font-bold text-black' >Your Email</span>: {ordr.user.email}</p>
              <p className='text-2xl font-medium text-yellow-500'> <span className='text-xl font-bold text-black'>Your Phone</span> : {ordr.user.phone}</p>
              <div className="">
                <h1 className='text-3xl font-bold text-center mb-3 mt-4 text-violet-400 border-t-2 pt-3 border-b-2 pb-3 '>Your address details</h1>
                <p className='text-xl font-bold text-black'> Your Details : <span className='text-2xl font-medium text-yellow-500'>{ordr.shippingAddress.details}</span></p>
                <p className='text-xl font-bold text-black'> Your City : <span className='text-2xl font-medium text-yellow-500'>{ordr.shippingAddress.city}</span></p>
                <p className='text-xl font-bold text-black'> Your phone : <span className='text-2xl font-medium text-yellow-500'>{ordr.shippingAddress.phone}</span></p>
              </div>
              <div className=" mt-6">
              <button onClick={() => { setOpen(!isOpen) }} className='text-3xl '><i className="fa-solid fa-arrow-right mt-4"></i>  Click Details</button>
              </div>
            </div>
          </div>
          {isOpen &&
            <div className="  flex-col items-center mt-4 justify-center flex">
              <div className=" border-2 p-10 rounded-3xl">
                <h1 className='text-3xl font-bold text-center text-blue-400 border-b-2 pb-3 mb-3 '>Purchase details</h1>
                <p className='text-2xl font-bold '>isPaid :  <span className='text-yellow-400 font-medium'> {ordr.isPaid && <i class="fa-solid fa-check"></i>}</span> </p>
                <p className='text-2xl font-bold'> Payment: <span className='text-yellow-400 font-medium'> {ordr.paymentMethodType}</span></p>
                <p className='text-2xl font-bold'> ID Order : <span className='text-yellow-400 font-medium'> {ordr.id}</span></p>
                <h1 className='text-2xl font-bold'> Total Price:  <span className='text-yellow-400 font-medium'>  {ordr.totalOrderPrice}</span></h1>
              </div>
            </div>
          }




        </div>

        )}
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Finish Order</title>
      </Helmet>
    </div>
  )
}




