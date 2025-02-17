
import { createRoot } from "react-dom/client";
import "../node_modules/flowbite/dist/flowbite.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import UserTokenProvider from "./components/Context/UserTokenPorvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NumItemContextProvider from "./components/Context/NumCartOfText";
import CartContextProvider from "./components/Context/CartContext.jsx";
import WishContextProvider from "./components/Context/WishContext.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <UserTokenProvider>
    <WishContextProvider>
      <CartContextProvider>
        <NumItemContextProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <App />
          </QueryClientProvider>
        </NumItemContextProvider>
      </CartContextProvider>
    </WishContextProvider>
  </UserTokenProvider>
);
