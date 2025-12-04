import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResults() {
  const query = useQuery();
  const q = (query.get("q") || "").trim();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    setLoading(true);
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
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const term = q.toLowerCase();
  const allResults = products.filter((p) => {
    const haystack = [p.title, p.title_es, p.vendor, p.description, p.description_es]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(term);
  });

  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const paged = allResults.slice(startIdx, startIdx + PAGE_SIZE);

  const getDisplayPages = (cur, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (cur <= 3) return [1, 2, 3, '...', total];
    if (cur >= total - 2) return [1, '...', total - 2, total - 1, total];
    return [1, '...', cur - 1, cur, cur + 1, '...', total];
  };
  const displayPages = getDisplayPages(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [q]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  if (!q) {
    return (
      <div className="products">
        <div className="container">
          <h2>Búsqueda</h2>
          <p>Introduce un término de búsqueda en el campo superior.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading-page"><p>Cargando resultados...</p></div>;
  if (error) return <div className="error-page"><p>Error: {error}</p></div>;

  return (
    <div className="products">
      <div className="products-page">
        <h1>Resultados de búsqueda</h1>
  <p style={{ marginBottom: 18 }}>{allResults.length} resultado(s) para "{q}"</p>

        {allResults.length === 0 ? (
          <div>
            <p>No se encontraron resultados.</p>
            <p>
              <Link to="/">Volver a inicio</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="products__grid">
              {paged.map((p) => (
                <ProductCard key={p.id || p.url} product={p} />
              ))}
            </div>

            {allResults.length > PAGE_SIZE && (
              <nav className="pagination" aria-label="Paginación de resultados de búsqueda">
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
          </>
        )}
      </div>
    </div>
  );
}
