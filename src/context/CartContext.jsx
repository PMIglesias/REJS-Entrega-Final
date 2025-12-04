import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const matches = (item, identifier) => {
    if (!identifier) return false;
    if (item.id && item.id === identifier) return true;
    if (item.url && item.url === identifier) return true;
    return false;
  };

  const addToCart = (product) => {
    const identifier = product.id || product.url;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => matches(item, identifier));
      if (existing) {
        return prevCart.map((item) =>
          matches(item, identifier) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const itemToStore = { ...product, quantity: 1 };
      return [...prevCart, itemToStore];
    });
  };

  const removeFromCart = (productIdOrUrl) => {
    setCart((prevCart) => prevCart.filter((item) => !matches(item, productIdOrUrl)));
  };

  const updateQuantity = (productIdOrUrl, quantity) => {
    const q = parseInt(quantity, 10) || 0;
    setCart((prevCart) => {
      if (q <= 0) {
        return prevCart.filter((item) => !matches(item, productIdOrUrl));
      }
      return prevCart.map((item) =>
        matches(item, productIdOrUrl) ? { ...item, quantity: q } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const numStr = price.replace(/[^0-9.]/g, '');
      return parseFloat(numStr) || 0;
    }
    return 0;
  };

  const getCartTotal = () =>
    cart.reduce((total, item) => total + (parsePrice(item.price) * (item.quantity || 0)), 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
