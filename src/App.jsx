import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Gatagores = lazy(() => import('./components/Gatagores'));
import Products from './components/Products';
const Brand = lazy(() => import('././components/Brand'));
import Register from './components/Register';
import Notfound from './components/Notfound';
import Cart from './components/Cart';
import Gardcomponent from './components/Context/Gardcomponent';
import ProductsDetails from './components/Context/ProductsDetails';
import Orders from './components/Orders';

import Payment from './components/Payment';
import Loading from './components/Loading';
import Wish from './components/Wish';
import GategoresPage from './components/GategoresPage';
import PrandDetails from './components/PrandDetails';
import ForgetPassword from './components/ForgetPassword';
import Vierialcode from './components/Vierialcode';
import ResetPassword from './components/ResetPassword';
import GatogresDetails from './GatogresDetails';

export default function App() {
  const router = createHashRouter ([
    {path: '/' , element: <Layout></Layout> , children:[
      {path:'/home' , element: <Suspense fallback={<Loading></Loading>}><Home></Home></Suspense>},
      {index:true , element: <Suspense fallback={<Loading></Loading>}><Login></Login></Suspense>},
      {path: '/gatagores' , element: <Suspense fallback={<Loading></Loading>}><GategoresPage></GategoresPage></Suspense>},
      {path: '/products' , element: <Products></Products>},
      {path: '/productsdetails/:id/:catid/', element: <ProductsDetails></ProductsDetails>},
      {path: '/prands' , element: <Suspense fallback={<Loading></Loading>}> <Brand></Brand> </Suspense>},
      {path: '/register' , element: <Register></Register>},
      {path: '/cart' , element: <Gardcomponent><Cart></Cart></Gardcomponent>},
      {path: '*' , element: <Notfound></Notfound>},
      {path: '/allorders' , element: <Orders></Orders>},
      {path: '/payment' , element: <Payment></Payment>},
      {path: '/wish' , element: <Wish></Wish>},
      {path: '/prandDetails/:id' , element: <PrandDetails></PrandDetails>},
      {path: '/gatagores/:id' , element: <GatogresDetails></GatogresDetails>},
      {path: '/forget' , element: <ForgetPassword></ForgetPassword>},
      {path: '/verialcode' , element: <Vierialcode></Vierialcode>},
      {path: '/resetpassword' , element: <ResetPassword></ResetPassword>},


    ]}
  ])
  return (
    <div className='imageBg'>
      <RouterProvider router={router} ></RouterProvider>
    </div>
  )
}
