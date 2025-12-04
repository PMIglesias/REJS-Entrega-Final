import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import HeroMen from "../components/HeroMen";
import HeroWomen from "../components/HeroWomen";

function Products({ defaultTab }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState(defaultTab || "men");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetch("/data/catalog_shoes_store.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (defaultTab) setTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  if (loading) return <div className="loading-page"><p>Cargando productos...</p></div>;
  if (error) return <div className="error-page"><p>Error: {error}</p></div>;

  let filtered = [];
  if (tab === "men") {
    filtered = products.filter(p => p.category === "mens-shoes");
  } else if (tab === "women") {
    filtered = products.filter(p => p.category === "womens-shoes");
  } else if (tab === "accessories") {
    filtered = products.filter(p => p.category === "accessories");
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  const getDisplayPages = (cur, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (cur <= 3) return [1, 2, 3, '...', total];
    if (cur >= total - 2) return [1, '...', total - 2, total - 1, total];
    return [1, '...', cur - 1, cur, cur + 1, '...', total];
  };
  const displayPages = getDisplayPages(page, totalPages);

  const titleMap = {
    men: "Zapatos Hombre",
    women: "Zapatos Mujer",
    accessories: "Accesorios",
  };

  return (
    <>
  {tab === 'men' && <HeroMen />}
  {tab === 'women' && <HeroWomen />}

      <div className="products-page">
        <h1>{titleMap[tab] || "Productos"}</h1>
        <div className="products-container">
          {filtered.length === 0 ? (
            <p>No hay productos en esta categoría.</p>
          ) : (
            paged.map((p) => (
              <ProductCard key={p.id || p.url} product={p} />
            ))
          )}
        </div>

        {filtered.length > PAGE_SIZE && (
          <nav className="pagination" aria-label="Paginación de productos">
            <button
              className="pagination__prev"
              onClick={() => setPage((s) => Math.max(1, s - 1))}
              disabled={page === 1}
              aria-label="Página anterior"
            >
              ‹
            </button>

            <ol className="pagination__pages">
              {displayPages.map((p, idx) => (
                <li key={String(p) + idx}>
                  {p === '...' ? (
                    <span className="pagination__ellipsis">…</span>
                  ) : (
                    <button
                      className={`pagination__page ${p === page ? 'is-active' : ''}`}
                      onClick={() => setPage(p)}
                      aria-current={p === page ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  )}
                </li>
              ))}
            </ol>

            <button
              className="pagination__next"
              onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
              disabled={page === totalPages}
              aria-label="Página siguiente"
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </>
  );
}

export default Products;
