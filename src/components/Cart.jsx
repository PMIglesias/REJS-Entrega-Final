function Cart({ cart }) {
  if (!cart.length) return <p>El carrito está vacío.</p>;

  return (
    <div className="cart">
      <h2>Carrito</h2>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.title_es} - {item.price} </li>
        ))}
      </ul>
    </div>
  );
}
export default Cart;
