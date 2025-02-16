import React, { createContext, useEffect, useState } from "react";

export const numItem = createContext(0);
export default function NumItemContextProvider({ children }) {
  let [carNum, setCartNum] = useState("");
  let [wishNum, setWish] = useState("");

  return (
    <numItem.Provider value={{ carNum, setCartNum, wishNum, setWish }}>
      {children}
    </numItem.Provider>
  );
}
