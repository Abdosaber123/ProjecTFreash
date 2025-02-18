import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userToken } from "./UserTokenPorvider";

export const CartContext = createContext();

function successMessage(msg) {
  toast.success(msg, {
    position: "top-right",
    icon: "🛒",
    style: {
      background: "#51A351",
      marginTop: "20px",
      color: "white",
      fontSize: "20px",
    },
  });
}
export default function CartContextProvider({ children }) {
  // let isLogin = localStorage.getItem('isLogin')
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  let [clearLoad, setClearLoad] = useState(false)
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const { isLogin } = useContext(userToken)
  

  const [updaingItem, setUpdaingItem] = useState('');

  async function getCart() {
    if (!isLogin) return;
    setIsCartLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: isLogin },
      })
      .then(({ data }) => {
        setCart(data.data.products);
        setCartId(data.cartId);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
      })
      .catch((error) => {
        setCart(null);
        setCartId(null);
        setNumOfCartItems(0);
      })
      .finally(() => {
        setIsCartLoading(false);
      });
  }
  async function clearCart() {
    if (!isLogin) return;
    setClearLoad(true);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: isLogin },
      })
      .then(() => {
        setCart(null);
        setCartId(null);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
      })
      .finally(() => {
        setClearLoad(false);
      });
  }
  async function addToCart(productId) {
    if (!isLogin) return;
    setUpdaingItem(productId);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: { token: isLogin } }
      )
      .then(({ data }) => {

        setCartId(data.cartId);
        setCart(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        successMessage("Product added succsessfully to your cart...");
      }).catch((error)=>{
      }).finally(() => {
        setUpdaingItem('');
      });
  }
  async function removeFromCart(productId) {
    if (!isLogin) return;
    setUpdaingItem(productId);
    await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token: isLogin } }
      )
      .then(({ data }) => {


        setCartId(data.cartId);
        setCart(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        successMessage("Product removed succsessfully from your cart...");
      })
      .finally(() => {
        setUpdaingItem('');
      });
  }
  async function upadeItemCount({ productId, count }) {
    setIsCartLoading(true)
    await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count },{ headers: { token: isLogin } })
      .then(({ data }) => {
        setCartId(data.cartId);
        setCart(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
      })
      .finally(() => {
        setIsCartLoading('')
      })


  }

  useEffect(() => {
    if ((cartId == null || cart == null) && isLogin?.length > 10) {
      getCart();
    }
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        cartId,
        cart,
        numOfCartItems,
        totalCartPrice,
        isCartLoading,
        updaingItem,
        getCart,
        clearCart,
        addToCart,
        removeFromCart,
        upadeItemCount,
        clearLoad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
