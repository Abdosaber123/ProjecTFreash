import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { userToken } from './UserTokenPorvider'
import toast from 'react-hot-toast'
export let wishContext = createContext()
export default function WishContextProvider({ children }) {
    let [isLoading, setLoading] = useState(false)
    let [Wish, setWish] = useState(null)
    let [isDelete, setDelete] = useState(false)
    let [wishId, setWishId] = useState(null)
    let [wishCount, setWishCount] = useState(0);
    const { isLogin: token } = useContext(userToken);
    const [isCartLoading, setIsCartLoading] = useState(false);


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
    async function getWish() {
        // if(!token) return
        setIsCartLoading(true)
        await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { headers: { token } }
        )
            .then(({ data }) => {
                // console.log(data);
                setWishId(data.data.id)
                setWish(data.data)
                setWishCount(data.count)

            }

            ).catch((error) => {
                setWish(null)

                setWishCount(0)
            }).finally(() => {
                setWishId(null)
                setIsCartLoading(false)

            })

    }

    async function addToWish(productId) {
        try {
            setLoading(true)
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers: { token } })
            setWishCount(data.data.length)
            if (data.status === 'success') {
                await getWish();
            }
            successMessage("Succsess Add To WishList")
        } catch (error) {
            successMessage('')
        } finally {
            setLoading(false)
            
        }


    }
    async function deleteWish(productId) {
        try {
            setDelete(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers: { token } }
            );

            if (data.status === 'success') {
                await getWish();
            }
        } finally {
            setDelete(false);
        }
    }
    useEffect(() => {
        if ((wishId == null || Wish == null) && token?.length > 10) {
            getWish();
        }
    }, [wishId]);
    return (
        <wishContext.Provider value={{
            Wish,
            wishCount,
            wishId,
            addToWish,
            isLoading,
            deleteWish,
            isDelete,
            isCartLoading,






        }}>
            {children}
        </wishContext.Provider>
    )
}
