import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from './../Loading';
import ProductsItem from '../ProductsItem';
import { CartContext } from './CartContext';

export default function ProductsDetails() {
    let {addToCart} = useContext(CartContext)
    let {id , catid } = useParams()
    let [productObj , setProduct] = useState({})
    let[ImageSrc , setImage] = useState('')
    let[loadingg , setLoading] = useState(false)
    let[ind , setIndex] = useState(0)
    let [detailstoinfo , setinfo] = useState([])
    
    async function getDetails(){
        setLoading(true)
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            setProduct(data.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    async function getDetailsItem(){

        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catid}`)
            setinfo(data.data);
            
        } catch (error) {
            
        }
    }
   
    function getImage(e){
        setIndex(e.target.getAttribute('index'));
        
        setImage(e.target.src);
        
    }
    useEffect(()=>{
        getDetails()
        
    },[id])
    useEffect(()=>{
        getDetailsItem()
    },[])
    if(loadingg)
        return <Loading></Loading>
    return (
    <div className='container'>
        <div className='flex items-center justify-center'>
        <div className='w-1/3 '>
            <img src={ImageSrc? ImageSrc:productObj.imageCover} className='w-full ' alt="" />
            <div className="flex items-center justify-center">
                {productObj?.images?.map((img,index)=><img src={img} index={index} onClick={getImage} className={`w-[20%] mt-4 transition-all cursor-pointer' alt='details
                    ${index==ind?"border-4 border-green-500 opacity-100" :"opacity-50" }
                 `}/>)}
            </div>
        </div>
        <div className='w-2/3 p-16'>
        <h2 className='text-[30px] font-bold'> {productObj.title} </h2>
        <p className='font-semibold mt-5 opacity-45'>{productObj.description}</p>
        <p className='mt-5  text-[25px] font-bold'>{productObj?.category?.name}</p>
        <div className="flex justify-between">
            <p className='font-bold text-[20px]'>{productObj.price} EGP</p>
        <span> <i className="fa-solid fa-star text-yellow-300 "></i> {productObj.ratingsQuantity}</span>
        </div>
        <button onClick={()=>{addToCart(productObj._id)}} className='w-full bg-green-500 py-2 px-5 text-white mt-5 rounded-lg'>Add Cart</button>

        </div>
        </div>
        <h2></h2>
       <div className="row mb-4">
        <div className="flex flex-wrap">
        {detailstoinfo.length? detailstoinfo.map(prod =><ProductsItem key={prod._id} prod={prod}></ProductsItem>): <Loading></Loading> }
        </div>
        
       </div>   
    </div>
  ) 
}
