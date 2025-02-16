import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";

export default function Gatagores() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 300,
  };
  
  let [isLoadin, setLoading] = useState(false);

  async function getGategores() {
    setLoading(true);
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, isPending, isLoading } = useQuery({
    queryKey: ["gategores"],
    queryFn: getGategores,
  });
  if (isPending) return <Loading></Loading>;

  return (
    <div className=" container hidden md:block">
      <Slider {...settings}>
        {data?.data?.data.map((elm) => (
          <div key={elm._id} className="my-20">
            <img src={elm.image} className="h-[200px] object-cover" alt="" />
            <p className="text-xl font-bold">{elm.name}</p>
          </div>
        ))}
      </Slider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gatagores</title>
      </Helmet>
    </div>
  );
}
