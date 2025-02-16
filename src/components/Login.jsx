import React, { useContext, useState } from "react";
import axios from "axios";
import {  useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userToken } from "./Context/UserTokenPorvider";
import { Helmet } from "react-helmet";
export default function Login() {
  let Navigate = useNavigate();

  let [loadingSpn, setLoadin] = useState(false);
  let [errorMsg, setError] = useState("");

  let { setLogin } = useContext(userToken);
  async function hundelLogin(value) {
    setLoadin(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        value
      );
      console.log(value);
      setLoadin(false);
      setError("");
      if (data.message === "success") {
        // localStorage.setItem('username' , formik.values.name)
        localStorage.getItem('username')
        localStorage.setItem("token", data.token);
        setLogin(data.token);
        Navigate("/home");
      }
    } catch (error) {
      setLoadin(false);
      setError("Your email pr password is correct  ");
    }
  }

  let validationSchema = Yup.object().shape({
    /// password /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    email: Yup.string().required("Required").email("Email Not Valid"),
    password: Yup.string().required("Required").matches().required("Not Valid"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: hundelLogin,
  });

  return (
    <div className="container ">
      {/* <h2 className="text-[1.5rem] font-bold mb-14 mt-9">Login :</h2> */}
      <form className="max-w-md  mx-auto mt-40" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group ">
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : (
            ""
          )}
          {errorMsg ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{errorMsg}</span>
            </div>
          ) : (
            ""
          )}
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium"> {formik.errors.password}</span>
            </div>
          ) : (
            ""
          )}
          <label
            for="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="flex justify-between items-center mb-10">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loadingSpn ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Login"
            )}
          </button>
          <Link to="/forget">
            <p className="hover:text-green-500 transition-all font-bold">
              Forget The Password
            </p>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/register"}>
            {" "}
            <span className=" text-blue-400">Idont Have Acoount !</span>{" "}
          </Link>
        </div>
      </form>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
    </div>
  );
}
