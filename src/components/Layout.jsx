import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">SHOEPASSION</Link>
        </div>
        <nav className="nav">
          <Link to="/productos">HOMBRE</Link>
          <Link to="/productos">MUJER</Link>
          <Link to="/accesorios">ACCESORIOS</Link>
          <Link to="/carrito">CARRITO</Link>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2025 Shoepassion Clone - Zapatería React</p>
      </footer>
    </>
  );
}
