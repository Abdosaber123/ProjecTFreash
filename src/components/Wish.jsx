import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import img from '../assets/nothing.JPG'
import { CartContext } from "./Context/CartContext";
import { wishContext } from "./Context/WishContext";


export default function Wish() {
  let {Wish , deleteWish, wishCount , isLoading } = useContext(wishContext)

  


  let { addToCart } = useContext(CartContext)

  // let { mutate: mutateDelete, isPending, error: errorWish, isError: errorDelete, submittedAt } = useWishlist(deleteWish)


  if (isLoading)
    return <Loading></Loading>


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
      
      <div className="container px-32  rounded-3xl">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 bg-[#F8F9FA] p-5 dark:bg-gray-800  ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
            <p className="text-3xl text-black font-semibold mb-3 dark:text-white">
              My wish List
            </p>
            <tbody className="">
              {Wish?.map((prod) => (
                <tr className=" border-b bg-[#F8F9FA] dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-[#F8F9FA] dark:hover:bg-gray-600">
                  <td className="p-4  md:flex  md:items-center border-t-2 ">
                    <div className=" ">
                      <img
                        src={prod?.imageCover}
                        className="w-[150px] dark:text-white  max-h-full  rounded-2xl"
                        alt="Apple Watch"
                      />
                    </div>
                    <div className=" px-2">
                      <p className="text-black font-bold text-xl">{prod?.title}</p>
                      <p className="text-[#198754] dark:text-white mt-2">
                        {" "}
                        Price: {prod?.price} EGP
                      </p>
                      <p onClick={() => { deleteWish(prod?._id) }} className={`  py-1 w-fit dark:text-white hover:text-white rounded-2xl mt-2 px-3 transition-all hover:bg-red-600 :'bg-blue-500' `}>

                        <i className="fa-solid fa-trash"></i> Remove
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                  <td className="px-6 py-4 !text-black text-center">
                    <p onClick={() => { addToCart(prod?.id) }} className="border-2 bg-[#0AAE0A] text-white cursor-pointer border-yellow-200 py-2 px-2 rounded-xl">
                    
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
