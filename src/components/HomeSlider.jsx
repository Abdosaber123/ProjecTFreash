import React from 'react'
import Slider from "react-slick";
import img1 from '../assets/images/slider-image-1.JPEG'
import img2 from '../assets/images/slider-image-2.JPEG'
import img3 from '../assets/images/slider-image-3.JPEG'
import img4 from '../assets/blog-img-1.JPEG'
import img5 from '../assets/blog-img-2.JPEG'
import { Helmet } from 'react-helmet';
export default function HomeSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true , 
        autoplaySpeed: 3000,
        arrows:false,
    
      };
  return (
    <div className='container hidden md:flex py-4   '>
        <div className="w-2/3 ">
      <Slider {...settings}>
        <img src={img1} className='h-[500px] object-cover' alt="" />
        <img src={img2} className='h-[500px] object-cover' alt="" />
        <img src={img3} className='h-[500px] object-cover' alt="" />
      </Slider>
        </div>
        <div className="w-1/3 ">
        <img src={img4} className='h-[250px] object-cover' alt="" />
        <img src={img5} className='h-[250px] object-cover' alt="" />
        </div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
    </div>
  )
}
