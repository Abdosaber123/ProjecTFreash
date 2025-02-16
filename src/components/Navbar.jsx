import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { userToken } from "./Context/UserTokenPorvider";
import { CartContext } from "./Context/CartContext";
import { wishContext } from "./Context/WishContext";
import { initFlowbite } from "flowbite";

export default function Navbar() {

  const testName = localStorage.getItem("username");
  let Navigate = useNavigate();
  let { isLogin, setLogin } = useContext(userToken);
  let ref = useRef();
  let { wishCount } = useContext(wishContext);
  const [isScroll , setScroll] = useState(false)

  const { numOfCartItems } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.body.classList.add("dark");
      ref.current.checked = true;
    }
  }, []);
  function changeDark() {
    console.log(ref.current.checked);
    let body = document.body;
    if (ref.current.checked) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }
  function logout() {
    localStorage.removeItem("token");
    setLogin(null);
    Navigate("/");
  }
  const hundelscroll = ()=>{
    console.log(window.scrollY);
    if(window.scrollY > 15){
      setScroll(true)
    }else{
      setScroll(false)
    }
  }
  useEffect(()=>{
    initFlowbite()
  },[])
  window.addEventListener("scroll" , hundelscroll)
  return (
    <div className=" ">
      <nav className={` ${isScroll == true ? "py-1" : "py-5"} transition-[padding] duration-500 bg-slate-100 border-gray-200  cursor-pointer fixed  top-0 left-0 z-10 right-0 mb-6`}>
        <div className="max-w-screen-xl  flex flex-wrap items-center  justify-between  mx-auto p-4">
          
            <Link
              to="/home"
              className="flex items-center w-[20%] space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8 " alt="Flowbite Logo" />
            </Link>
          
           
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden  w-[80%]  lg:flex lg:justify-between  "
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border lg:items-center   lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              {isLogin && (
                <li>
                  <Link
                    to="/home"
                    className="block py-3 px-3 text-black  rounded lg:bg-blue hover:bg-gray-100  lg:py-1 transition-all delay-200 hover:text-blue-700  lg:hover:text-black"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
              )}
              {isLogin && (
                <li>
                  <Link
                    to="/products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Products
                  </Link>
                </li>
              )}
              {isLogin && (
                <li>
                  <Link
                    to="/gatagores"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Gatagores
                  </Link>
                </li>
              )}
              {isLogin && (
                <li>
                  <Link
                    to="/prands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Prands
                  </Link>
                </li>
              )}
              
              {isLogin ? (
                <li>
                  <Link
                    to="/cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Cart
                  </Link>
                </li>
              ) : (
                ""
              )}
              {isLogin ? (
                <li>
                  <Link
                    to="/wish"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Wish
                  </Link>
                </li>
              ) : (
                ""
              )}
              {isLogin && (
                <li>
                  <Link
                    to="/allorders"
                    className=" py-2 px-3 hidden text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    AllOrders
                  </Link>
                </li>
              )}
            </ul>
            <ul className="font-medium md:items-start lg:items-center flex-col  gap-4 lg:gap-0 flex justify-center md:justify-between  p-4 lg:p-0 mt-4 border relative  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 ">
              {isLogin ? (
                <>
                  <Link to={"/cart"}>
                    {" "}
                    <li className="hover:bg-gray-100  lg:hover:bg-transparent sm:py-2 px-3">
                      {" "}
                      <i className="fa-solid fa-cart-shopping   dark:text-white text-3xl">
                        {" "}
                        <span className="text-[10px] dark:text-white text-white md:left-11 lg:left-7 md:-top-1 lg:-top-2 -top-2   left-11 absolute bg-[#4FA74F] px-3 rounded-md ">
                          {numOfCartItems}
                        </span>{" "}
                      </i>{" "}
                    </li>
                  </Link>
                  <Link to={"/wish"}>
                    {" "}
                    <li className="hover:bg-gray-100 lg:hover:bg-transparent sm:py-2 px-3">
                      {" "}
                      <i className="fa-solid fa-heart text-3xl relative mt-5 lg:mt-0  ">
                        {" "}
                        <span className="text-[10px] text-white  -top-5    absolute bg-[#4FA74F] px-3 rounded-md left-3   ">
                          {wishCount}
                        </span>{" "}
                      </i>{" "}
                    </li>
                  </Link>
                  {isLogin ? (
                    <li>
                      
                      {testName && (
                        <h2 className="font-bold dark:text-white text-blue-500 hover:bg-gray-100 lg:hover:bg-transparent sm:py-2 px-3">
                          {" "}
                          <i className="fa-solid fa-user"></i> Hi, {testName}{" "}
                        </h2>
                        
                      )}
                      

                    </li>

                  ) : (
                    ""
                  )}
                  <li onClick={logout}>
                    <Link
                      
                      className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      <span><i className="fa-solid mr-2    fa-arrow-right-from-bracket"></i>Log Out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>
                  </li>
                </>

              )}


              {/* <li>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    onChange={changeDark}
                    ref={ref}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    for="toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label for="toggle" className="text-xs text-gray-700">
                  
                </label>
              </li> */}
            </ul>
          </div>
        </div> 
      </nav>
    </div>
  );
}
