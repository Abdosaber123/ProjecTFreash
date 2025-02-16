import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  // let token = localStorage.getItem('token')
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [token, setToken] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [updaingItem, setUpdaingItem] = useState('');

  async function getCart() {
    if (!token) return;
    setIsCartLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
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
    if (!token) return;
    setIsCartLoading(true);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then(() => {
        setCart(null);
        setCartId(null);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
      })
      .finally(() => {
        setIsCartLoading(false);
      });
  }
  async function addToCart(productId) {
    if (!token) return;
    setUpdaingItem(productId);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: { token } }
      )
      .then(({ data }) => {
        console.log(data);
        setCartId(data.cartId);
        setCart(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        successMessage("Product added succsessfully to your cart...");
      })
      .finally(() => {
        setUpdaingItem('');
      });
  }
  async function removeFromCart(productId) {
    if (!token) return;
    setUpdaingItem(productId);
    await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token } }
      )
      .then(({ data }) => {
        console.log(data);

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
    await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers: { token } })
      .then(({ data }) => {
        setCartId(data.cartId);
        setCart(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
      })
      .finally(()=>{
        setIsCartLoading('')
      })
      
      
  }
  
  if (token == null) {
    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
}

  useEffect(() => {
    if ((cartId == null || cart == null) && token?.length > 10) {
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
