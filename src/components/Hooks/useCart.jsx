import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let token = localStorage.getItem("token");

export function getPagecart() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token,
    },
  });
}

export default function useCart(Fn) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: Fn,
  });
}
