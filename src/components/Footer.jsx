import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();
  const isFavPage = pathname === "/favoritos";

  return (
    <footer className={"footer" + (isFavPage ? " footer--fixed" : "")}>
      <div className="footer__columns">
        <div>
          <h4>Atención al Cliente</h4>
          <ul>
            <li>Contacto</li>
            <li>Envios</li>
            <li>Devoluciones</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4>Nosotros</h4>
          <ul>
            <li>Nuestra Historia</li>
            <li>Sucursales</li>
            <li>Trabaja con Nosotros</li>
          </ul>
        </div>
        <div>
          <h4>Nuestras Redes Sociales</h4>
          <div className="footer__social" aria-hidden="false">
            <a href="https://www.facebook.com/shoepassion" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.2 10.44 22v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.17c-1.15 0-1.51.72-1.51 1.46v1.75h2.57l-.41 2.9h-2.16V22C18.34 21.2 22 17.09 22 12.07z"/>
              </svg>
            </a>

            <a href="https://www.instagram.com/shoepassion" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.5-3a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
              </svg>
            </a>

            <a href="https://x.com/shoepassion" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer__social-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden>
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
