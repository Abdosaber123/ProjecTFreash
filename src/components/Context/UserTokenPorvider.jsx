import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let userToken = createContext(null);
export default function UserTokenProvider({ children }) {
  let [isLogin, setLogin] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!isLogin && localStorage.getItem("token")) {
      setLogin(localStorage.getItem("token"));
    }

    async function getUserData() {
      await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
        headers: {
          token: isLogin
        }
      }).then(({data}) =>{
        setUserId(data.decoded?.id);
      });
    }
    if (isLogin && userId == null) {
      getUserData();
    }
  }, [isLogin]);

  return (
    <userToken.Provider value={{ isLogin, userId, setLogin }}>
      {children}
    </userToken.Provider>
  );
}
