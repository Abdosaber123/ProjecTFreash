import React from 'react'

export default function Footer() {
  return (
    <div className='mt-32  bg-gray-100 py-10'>
      <div className="container">
        <p className='text-3xl mb-2'>Get The Fresh Cart </p>
        <p className='text-opacity-50 text-black'> we Will send you a link, open it on your phone to download the app</p>
        <div className=" flex justify-between footer border-b-2 p-5">
            <input type="email" className='w-80px' placeholder='Email..' name="" id="" />
            <p className='py-2 px-3 bg-yellow-400'>Share App Link </p>
        </div>
        <div className="lg:flex lg:justify-between border-b-2 p-5 pb-7  ">
            <div className="  lg:flex gap-4">
                <p className='font-bold text-[20px] lg:font-normal lg:text-[16px]'>Payment Partenrs</p>
                <p><i className="fa-brands fa-cc-mastercard p-3 lg:p-0 lg:text-[25px] text-[35px]"></i></p>
                <p><i className="fa-brands fa-paypal p-3 lg:p-0 lg:text-[25px] text-[35px]"></i></p>
                <p><i className="fa-brands fa-amazon-pay lg:p-0  p-3 lg:text-[25px] text-[35px]"></i></p>
            </div>
            <div className="lg:flex lg:items-center p-10 lg:p-0  ">
                <p className='mb-2 lg:mb-0'>Get deliveries With FrechCart </p>
                <div className=" bg-black rounded-md py-1 ml-3 px-3 lg:flex lg:items-center text-white ">
                <p><i className="fa-brands fa-apple text-white text-[25px] w-fit mr-2"></i></p>
                <div className="lg:flex lg:flex-col lg:items-center justify-center  ">
                    <p className='text-[10px]'>Available on the </p>
                    <p>App Store</p>
                </div>
                </div>
                <div className=" bg-black rounded-md py-1 ml-3 px-3 lg:flex lg:items-center mt-3 lg:mt-0 text-white ">
                <i className="fa-brands fa-google-play text-white text-[25px] w-fit mr-2"></i>
                <div className="lg:flex lg:flex-col lg:items-center lgjustify-center  ">
                    <p className='text-[10px]'>Git It On </p>
                    <p>Google Play</p>
                </div>
                </div>
            </div>
            
        </div>
        <div className=" flex justify-center mt-4">
              <p>© <span className='text-[#0AAE0A] text-2xl font-medium'>Abdelrahman Sabry</span> All Rights Resrved</p>
            </div>
      </div>
    </div>
  )
}
