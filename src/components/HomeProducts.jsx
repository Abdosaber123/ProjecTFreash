import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductsItem from './ProductsItem';
import Loading from './Loading';
import { Helmet } from 'react-helmet';


export default function HomeProducts() {
    const [productArr , setProductArr] = useState([])
    const [errorMsg , setErrorMsg] = useState('')
    const [loading , setLoading] = useState(false)
    const [search , setSearch ] = useState('')

    async function getProducts (){
        try {
            let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        setProductArr(data.data);
        setErrorMsg('')
        setLoading(true)
        
        } catch (error) {
            setErrorMsg(error.message);
            setLoading(flase)
        }
        
    }
    useEffect(()=> {
        getProducts()
    } , [])
     
    if(errorMsg){
        return <h2>  {errorMsg} </h2>
    }

    
  return (
    <div className='container '>
        <div className="flex justify-center bg-red-600 ">
        </div>
        <div className=' flex flex-wrap px-10  '>
            {productArr.length? productArr.map(prod => <ProductsItem key ={prod._id} prod={prod}></ProductsItem>): <Loading></Loading> }
        </div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
    </div>
  )
}
