import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./styles/globals.css";

import { FavProvider } from "./context/FavContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <FavProvider>
              <App />
            </FavProvider>
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
