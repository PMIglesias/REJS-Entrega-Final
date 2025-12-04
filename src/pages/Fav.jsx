import React from "react";
import { useFav } from "../context/FavContext";
import ProductCard from "../components/ProductCard";

export default function Fav() {
  const { favorites } = useFav();

  return (
    <div className="fav-page">
      <h1>Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <div className="products-container">
          {favorites.map((product) => (
            <ProductCard key={product.id || product.url} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
