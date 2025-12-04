import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/catalog_shoes_store.json")
      .then((res) => res.json())
      .then((data) => {
        const decodedId = (() => {
          try { return decodeURIComponent(id); } catch(e) { return id; }
        })();
        const found = data.find((p) =>
          (p.id && p.id === decodedId) || (p.id && p.id === id) || p.url === decodedId || p.url === id
        );
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const formatPrice = (raw) => {
    if (typeof raw === 'number') return `Precio $${raw.toFixed(2)}`;
    const s = (raw ?? "").toString().trim();
    return 'Precio ' + (/^[£€¥$]/.test(s) ? s : `$${s}`);
  };

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail">
      <div className="product-detail__images">
        {product.img.map((image, i) => (
          <img 
            key={i} 
            src={image} 
            alt={`${product.title_es} ${i + 1}`}
            onError={(e) => { e.target.src = '/placeholder.svg'; }}
          />
        ))}
      </div>
      <div className="product-detail__info">
        <h1>{product.title_es}</h1>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="vendor">Marca: {product.vendor}</p>
        <AddToCartButton product={product} />
        { (product.description_es || product.description) && (
          <div className="product-detail__description">
            <h3>Descripción</h3>
            <p>{product.description_es || product.description}</p>
          </div>
        ) }

        { (product.product_details_es || product.product_details) && (
          <div className="product-detail__specs">
            <h3>Detalles del producto</h3>
            <dl>
              {Object.entries(product.product_details_es || product.product_details).map(([k,v]) => {
                  const humanKey = k
                    .replace(/[_\-]+/g, ' ')
                    .trim()
                    .split(/\s+/)
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                    .join(' ');
                  return (
                    <React.Fragment key={k}>
                      <dt style={{fontWeight:600, marginTop:8}}>{humanKey}</dt>
                      <dd style={{marginLeft:0, marginBottom:6}}>{String(v)}</dd>
                    </React.Fragment>
                  );
                })}
            </dl>
          </div>
        ) }
      </div>
    </div>
  );
}

function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handle = () => {
    setAdding(true);
    try {
      addToCart(product);
    } catch (e) {
      console.error('Error adding to cart', e);
    } finally {
      setTimeout(() => setAdding(false), 400);
    }
  };

  return (
    <button onClick={handle} disabled={adding} className="btn-add-to-cart">
      {adding ? 'Agregando...' : 'Agregar al carrito'}
    </button>
  );
}

