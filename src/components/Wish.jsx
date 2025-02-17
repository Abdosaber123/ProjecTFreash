import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import img from '../assets/nothing.jpg'
import { CartContext } from "./Context/CartContext";
import { wishContext } from "./Context/WishContext";
import toast from "react-hot-toast";


export default function Wish() {
  let {Wish , deleteWish, wishCount , isLoading , isDelete , isCartLoading } = useContext(wishContext)

  


  let { addToCart } = useContext(CartContext)

  // let { mutate: mutateDelete, isPending, error: errorWish, isError: errorDelete, submittedAt } = useWishlist(deleteWish)

  if(isCartLoading)
    return <Loading></Loading>
  if(isDelete){
    toast.error('Success Romove WishList' ,{
      position:'top-right' ,
      icon:'❤️' ,
      style:{
        background: 'red',
        marginTop:'20px',
        color:"white",
        fontSize:'20px'
      }
    })
  }


  // console.log(data?.data?.count);
  // setWish(data?.data?.count)
  // console.log(data?.data?.data);


  if (wishCount == '0') {
    return (


      <div className="container">
        <div className="flex flex-col items-center bg-[#F0F3F2] py-16 ">
          <p className="mt-28 text-[50px] mb-3 text-[#36B737] font-bold">This WishList is empty</p>

          <img src={img} className="w-[40%]" alt="" />
        </div>
      </div>

    );
  }

  return (
    <div className="mt-20">
      
      <div className="container lg:px-32  rounded-3xl">
        <div className="relative overflow-x-auto   shadow-md sm:rounded-lg mt-10 bg-[#F8F9FA] p-5   ">
          <table className="w-full  text-sm text-left rtl:text-right text-gray-500   ">
            <p className="text-3xl text-black font-semibold mb-3 ">
              My wish List
            </p>
            <tbody className="">
              {Wish?.map((prod) => (
                <tr className="flex flex-col items-center lg:items-center lg:justify-between  lg:flex-row border-b bg-[#F8F9FA]   ">
                  <td className="p-4  md:flex  md:items-center border-t-2 ">
                    <div className="flex justify-center ">
                      <img
                        src={prod?.imageCover}
                        className="w-[150px] dark:text-white  max-h-full  rounded-2xl"
                        alt="Apple Watch"
                      />
                    </div>
                    <div className=" px-2 flex flex-col items-center">
                      <p className="text-black font-bold text-3xl">{prod?.title}</p>
                      <p className="text-[#198754] text-2xl dark:text-white mt-4 text-center">
                        {" "}
                        Price: <span className="text-yellow-300 font-bold">{prod?.price}</span> EGP
                      </p>
                      <p onClick={() => { deleteWish(prod?._id) }} className={`text-xl   py-3 w-fit dark:text-white hover:text-white rounded-2xl mt-4 px-3 transition-all hover:bg-red-600 :'bg-blue-500' `}>

                        <i className="fa-solid fa-trash "></i> Remove
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 !text-black text-center">
                    <p onClick={() => { addToCart(prod?.id) }} className="border-2 bg-[#0AAE0A] text-xl text-white cursor-pointer border-yellow-200 py-3 px-4 rounded-xl">
                    
                      Add To Cart +</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>WishList</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
    </div>

  );
}
