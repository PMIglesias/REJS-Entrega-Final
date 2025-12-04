import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const extractPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const numStr = price.replace(/[^0-9.]/g, '');
      return parseFloat(numStr) || 0;
    }
    return 0;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para continuar</p>
          <button onClick={() => navigate("/productos")} className="btn-primary">
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Carrito de Compras</h1>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id || item.url} className="cart-item">
              <Link to={`/producto/${encodeURIComponent(item.id || item.url)}`}>
                <img 
                  src={item.img[0]} 
                  alt={item.title_es} 
                  className="cart-item__image"
                  onError={(e) => { e.target.src = '/placeholder.svg'; }}
                />
              </Link>

              <div className="cart-item__info">
                <h3>
                  <Link to={`/producto/${encodeURIComponent(item.id || item.url)}`}>{item.title_es}</Link>
                </h3>
                <p className="cart-item__vendor">{item.vendor}</p>
              </div>

              <div className="cart-item__quantity">
                <button onClick={() => updateQuantity(item.id || item.url, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id || item.url, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="cart-item__price">
                <p>{'Precio $' + (extractPrice(item.price) * item.quantity).toFixed(2)}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id || item.url)}
                className="cart-item__remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary__total">
            <h3>Total:</h3>
            <h2>{'Precio $' + getCartTotal().toFixed(2)}</h2>
          </div>
          
          <button className="btn-primary btn-checkout">
            Proceder al Pago
          </button>
          
          <button onClick={clearCart} className="btn-secondary">
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
