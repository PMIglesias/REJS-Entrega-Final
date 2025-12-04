import React, { createContext, useContext, useState, useEffect } from "react";

const FavContext = createContext();
export const useFav = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const id = product.id || product.url;
      const exists = prev.find((item) => (item.id && item.id === id) || item.url === id);
      if (exists) {
        return prev.filter((item) => !((item.id && item.id === id) || item.url === id));
      }
      return [...prev, product];
    });
  };

  const isFavorite = (productIdOrUrl) => {
    return favorites.some((item) => (item.id && item.id === productIdOrUrl) || item.url === productIdOrUrl);
  };

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
};
