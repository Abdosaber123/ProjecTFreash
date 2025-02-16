import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { CartContext } from "./Context/CartContext";
import { Loader, ShoppingCart } from 'lucide-react';
import { wishContext } from "./Context/WishContext";

export default function ProductsItem({ prod }) {
  let [isOpen, setOpen] = useState(false);
let {addToWish , isLoading} = useContext(wishContext)
  const { addToCart, updaingItem } = useContext(CartContext);
  // let [title , imageCover , price , category  ] = prod


  if (isLoading) return <Loading></Loading>;

  if (isOpen)
    toast.success(" Succsess Add To WishList  ", {
      position: "top-right",
      icon: "❤️",
      style: {
        background: "#51A351",
        marginTop: "20px",
        color: "white",
        fontSize: "20px",
      },
    });

  // if(!isOpen){
  //   toast.error('Success Romove WishList' ,{
  //     position:'top-right' ,
  //     icon:'❤️' ,
  //     style:{
  //       background: 'red',
  //       marginTop:'20px',
  //       color:"white",
  //       fontSize:'20px'
  //     }
  //   })
  // }
  // if(isError | errorWish)
  //   toast.error(error?.response?.data?.message)
  return (
    <div className=" product w-1/2   md:w-1/3 lg:w-1/4 flex flex-col dark:bg-gray-900 hover:shadow-xl dark:text-white  p-10 ">
      <Link to={`/productsdetails/${prod.id}/${prod.category._id}`}>
        <img src={prod.imageCover} className="w-full" alt="" />
        <p className="font-sm font-bold text-green-600">
          {" "}
          {prod.category.name}
        </p>
        <p>{prod.title.split(" ").slice(0, 2).join(" ")}</p>
        <div className="flex justify-between mt-2">
          <div className="">
            <p className={prod.priceAfterDiscount ? "line-through" : ""}>
              {prod.price} EGP{" "}
            </p>
            <p className="text-blue-500">
              {prod.priceAfterDiscount ? prod.priceAfterDiscount + "EGP" : ""}{" "}
            </p>
          </div>
          <span>
            {" "}
            <i className="fa-solid fa-star text-yellow-200"></i>{" "}
            {prod.ratingsAverage}{" "}
          </span>
        </div>
      </Link>
      <button
        onClick={() => {
          addToWish(prod.id);
        }}
        className="text-end text-2xl hover:text-red-800"
      >
        {" "}
        <p
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {" "}
          {isOpen ? (
            <i className="fa-solid fa-heart"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}{" "}
        </p>{" "}
      </button>
      <button
        onClick={() => {
          addToCart(prod.id);
        }}
        className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:from-green-500 hover:to-green-600 hover:shadow-lg hover:-translate-y-0.5"
      >
        {updaingItem === prod._id ? (
          <Loader className="w-4 h-4 animate-spin text-white" />
        ) : (
          <ShoppingCart className="w-4 h-4 text-white" />
        )}
        <span>Add to cart</span>
      </button>
      {/* <button onClick={()=>{setOpen(!isOpen)}}>{isOpen ?  <i className="fa-solid fa-heart"></i> :<i className="fa-regular fa-heart"></i>}</button> */}
    </div>
  );
}
