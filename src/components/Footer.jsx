import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();
  const isFavPage = pathname === "/favoritos";

  return (
    <footer className={"footer" + (isFavPage ? " footer--fixed" : "")}>
      <div className="footer__columns">
        <div>
          <h4>Atención al Cliente</h4>
          <ul>
            <li><Link to="/contacto" style={{ color: 'inherit', textDecoration: 'none' }}>Contacto</Link></li>
            <li><Link to="/envios-devoluciones" style={{ color: 'inherit', textDecoration: 'none' }}>Envíos</Link></li>
            <li><Link to="/envios-devoluciones" style={{ color: 'inherit', textDecoration: 'none' }}>Devoluciones</Link></li>
            <li><Link to="/faqs" style={{ color: 'inherit', textDecoration: 'none' }}>FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4>Nuestras Redes Sociales</h4>
          <div className="footer__social" aria-hidden="false">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.2 10.44 22v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.17c-1.15 0-1.51.72-1.51 1.46v1.75h2.57l-.41 2.9h-2.16V22C18.34 21.2 22 17.09 22 12.07z"/>
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.5-3a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
              </svg>
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C17.8 2.5 12 2.5 12 2.5s-5.8 0-8.6.5c-.4 0-1.4.1-2.1.9C.9 4.6.7 6.2.7 6.2S.5 8 .5 9.8v2.4C.5 14 0 15.5 0 15.5s.2 1.6.7 2.3c.8.8 1.8.8 2.3.9 1.6.2 6.8.5 6.8.5s5.8 0 8.6-.5c.4 0 1.4-.1 2.1-.9.6-.7.8-2.3.8-2.3s.2-1.5.2-3.3V9.8c0-1.8-.2-3.6-.2-3.6zM9.8 14.4V7.6l6.4 3.4-6.4 3.4z"/>
              </svg>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="footer__copy">© 2025 Shoepassion</p>
    </footer>
  );
}
