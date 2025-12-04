import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/catalog_shoes_store.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data.slice(0, 6)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="products">
        <div className="loading">Cargando productos...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products">
        <div className="error">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="products">
      <h2>Men's Collection</h2>
      <div className="products__grid">
        {products.map((item) => (
          <ProductCard key={item.id || item.url} product={item} />
        ))}
      </div>
      <div className="products__view-all">
        <Link to="/productos" className="btn-view-all">
          Ver Todos los Productos
        </Link>
      </div>
    </section>
  );
}

