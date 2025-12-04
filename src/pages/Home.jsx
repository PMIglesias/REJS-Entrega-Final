import React, { useEffect, useState } from "react";
import HeroHome from "../components/HeroHome";
import ProductCard from "../components/ProductCard";
import Brands from "../components/Brands";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/catalog_shoes_store.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sample = (arr, cat) => {
    const filtered = arr.filter((p) => p.category === cat);
    const copy = [...filtered];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 5);
  };

  if (loading) return <div className="loading-page"><p>Cargando...</p></div>;

  const men = sample(products, "mens-shoes");
  const women = sample(products, "womens-shoes");
  const accessories = sample(products, "accessories");

  return (
    <main className="home">
      <HeroHome />

      <section className="collections">
        <div className="collection">
          <h2>Colección Hombre</h2>
          <div className="collection-row">
            {men.map((p) => (
              <ProductCard key={p.id || p.url} product={p} showAdd={false} />
            ))}
          </div>
        </div>

        <div className="collection">
          <h2>Colección Mujer</h2>
          <div className="collection-row">
            {women.map((p) => (
              <ProductCard key={p.id || p.url} product={p} showAdd={false} />
            ))}
          </div>
        </div>

        <div className="collection">
          <h2>Accesorios</h2>
          <div className="collection-row">
            {accessories.map((p) => (
              <ProductCard key={p.id || p.url} product={p} showAdd={false} />
            ))}
          </div>
        </div>
      </section>

      <Brands />
    </main>
  );
}
