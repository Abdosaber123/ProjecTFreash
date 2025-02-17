import React, { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import img from "../assets/bassket.jpg";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./Context/CartContext";
import { Loader, Minus, Plus, Trash } from "lucide-react";
import Clear from "./Clear";

export default function Cart({ prod }) {

  let [isOpen, setOpen] = useState(false);
  let { removeFromCart, updaingItem } = useContext(CartContext);

  const {
    cart,
    getCart,
    numOfCartItems,
    isCartLoading,
    totalCartPrice,
    clearCart,
    clearLoad,
    upadeItemCount,
  } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  if (!numOfCartItems)
    return (
      <div className="flex mt-32 justify-center items-center ">
        <img src={img} className=" sm:w-[70%] lg:w-[50%]" alt="" />
      </div>
    );

  if (clearLoad) return <Clear></Clear>;

  return (
    <div className="container    rounded-3xl">
      <div className="relative overflow-x-auto shadow-md  sm:rounded-lg mt-10 bg-white p-5 dark:bg-gray-800  ">
        <table className=" lg:w-full mt-16  text-sm text-left rtl:text-right text-gray-500  ">
          <p className="text-4xl text-black font-semibold mb-3 ">Shop Cart</p>
          <div className="md:flex md:justify-center md:gap-20 mt-8  text-center     ">
            <h1 className=" mb-5 font-semibold text-yellow-500   sm:text-[16px] md:text-[30px]   ">
              Total Cart: {numOfCartItems}{" "}
            </h1>
            <h1 className=" mb-3 font-semibold  text-yellow-300 sm:text-[16px] md:text-[30px] ">
              Total Price: {totalCartPrice}{" "}
            </h1>
          </div>

          <tbody className="">
            {cart?.map((prod) => (
              <tr
                key={prod?.product?._id}
                className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50  dark:hover:bg-gray-600"
              >
                <td className="p-4 flex flex-col lg:flex-row items-center border-t-2 ">
                  <div className="flex justify-center ">
                    <img
                      src={prod?.product?.imageCover}
                      className="lg:w-[100px] md:w-[40%]  max-h-full  rounded-2xl"
                      alt="Apple Watch"
                    />
                  </div>
                  <div className=" px-2 ">
                    <p className=" text-2xl">{prod?.product?.title}</p>
                    <p className="text-yellow-300 text-2xl  mt-3">
                      {" "}
                      Price: {prod?.price} EGP
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex md:flex-row flex-col items-center gap-3">
                    <Minus
                      onClick={() => {
                        upadeItemCount({
                          productId: prod?.product?._id,
                          count: prod?.count - 1,
                        });
                      }}
                      className="w-6 h-6 bg-gray-100 p-1 rounded-full cursor-pointer text-green-400 hover:text-green-600" />

                    <p>{prod?.count}</p>
                    <Plus
                      onClick={() => {
                        upadeItemCount({
                          productId: prod?.product?._id,
                          count: prod?.count + 1,
                        });
                      }}

                      className="w-6 h-6 bg-gray-100 p-1 rounded-full cursor-pointer text-green-400 hover:text-green-600" />

                    <div onClick={() => { removeFromCart(prod?.product?._id) }}>
                      {updaingItem === prod?.product?._id ? (
                        <Loader className="w-6 h-6 bg-gray-100 p-1 animate-spin rounded-full cursor-pointer text-black" />
                      ) : (
                        <Trash className="w-6 h-6 bg-gray-100 p-1 rounded-full cursor-pointer text-red-400 hover:text-red-600" />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex-col flex md:flex-row justify-between items-center p-3 mt-4 lg:px-10">
          
          <Link to='/payment' className="bg-[#0AAE0A] p-3  text-white text-xl font-bold rounded-2xl">
          Payment <span><i className="fa-brands text-2xl fa-cc-mastercard"></i></span>
        </Link>
        <button
            onClick={clearCart}
            className="bg-red-500 p-3 mt-6 md:mt-0 text-white text-xl rounded-2xl font-bold">
            {" "}
            Clear ALL <span className="hover:text-red-600 transition-all" ><i className="fa-solid fa-trash"></i></span>
          </button>
        </div>
        
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </div>
  );
}
