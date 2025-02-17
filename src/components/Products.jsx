import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import ProductsItem from "./ProductsItem";
import Loading from "./Loading";
import { Helmet } from "react-helmet";
import img from "../assets/search.avif"

export default function Products() {
  let [search, setSearch] = useState("");
  let [dataTest, setData] = useState([]);
  function getData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, mutate } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  // console.log(data?.data?.data);
  let Products = data?.data?.data.filter(
    (product) =>
      search === "" ||
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div className="flex mt-3 justify-center ">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className=" mt-28 sm:w-[80%]  rounded-2xl"
          placeholder="Search..."
          type="text"
        />
      </div>
      <div className="flex flex-wrap">
        {Products.length == 0 &&
          (search.length > 0 ? (
            <h1 className="flex justify-center mx-auto items-center text-3xl font-bold">
              <img src={img} alt="" />
            </h1>
          ) : (
            <h1 className="flex justify-center items-center text-3xl font-bold">
              There is no products...
            </h1>
          ))}
        {Products.map((prod) => (
          <ProductsItem key={prod._id} prod={prod}></ProductsItem>
        ))}
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Product</title>
      </Helmet>
    </div>
  );
}
