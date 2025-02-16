import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export let wishContext = createContext()
export default function WishContextProvider({ children }) {
    let token = localStorage.getItem('token')
    // let [token , setToken] = useState(null)
    let [isLoading, setLoading] = useState(false)
    let [Wish, setWish] = useState(null)
    let [wishId, setWishId] = useState(null)
    let [wishCount, setWishCount] = useState(0)




    async function getWish() {
        // if(!token) return
        setLoading(true)
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
                setLoading(false)

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
        } catch (error) {

        }finally{
            setLoading(false)
        }


    }
    async function deleteWish(productId) {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers: { token } }
            );

            if (data.status === 'success') {
                await getWish();
            }
        } finally {
            setLoading(false);
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






        }}>
            {children}
        </wishContext.Provider>
    )
}
