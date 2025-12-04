
# Shoepassion — React (Vite) Pre-entrega


- Proyecto creado con React + Vite.
- Implementaciones principales: listado de productos, página de detalle, carrito con Context API, búsqueda con paginación, marcas/carousel, responsive layout, y rutas protegidas con un auth-demo.
- Fuente de datos: `public/data/catalog_shoes_store_es.json` (JSON estático usado como "API" para la pre-entrega).

## Requerimientos

- Requerimiento #1 (Carrito básico, listado, useState, clic para agregar, mostrar carrito, layout)
	- Carrito implementado con `CartContext` (add/remove/update, persistencia en localStorage).
	- Componentes de listado (`Products`) y tarjetas (`ProductCard`) con botón "Agregar al carrito".
	- Página de carrito (`/carrito`) muestra artículos, cantidades y total.

- Requerimiento #2 (Conexión a API, useEffect, carga/errores)
	- Las páginas cargan productos con `fetch('/data/catalog_shoes_store_es.json')` dentro de `useEffect` y manejan `loading`/`error`.
	- Se utiliza un JSON estático

- Requerimiento #3 (Rutas e integración)
	- Enrutado con React Router en `src/App.jsx` (páginas: `/`, `/productos`, `/producto/:id`, `/search`, `/men`, `/women`, `/carrito`, `/login`, `/favoritos`, `/admin`).

- Requerimiento #4 (Rutas dinámicas y protegidas) 
	- Ruta dinámica para detalle de producto: `/producto/:id`.
	- Rutas protegidas implementadas usando `AuthContext` y `ProtectedRoute` para `/carrito` y `/admin`.
	- Autenticación actual: acepta cualquier usuario y contraseña no vacíos y persiste en `localStorage`.
	

### Funcionalidades adicionales implementadas
- Paginación de productos y de resultados de búsqueda (20 por página).
- Brands carousel y mapeo explícito de nombres para búsqueda por marca.
- Product detail: muestra descripción y especificaciones.
- Responsive improvements: header search oculto en mobile (queda en drawer), footer responsive, collection grid responsive.
- Product detail layout: imágenes en columna con scroll interno y columna de información sticky.

## Tecnologías usadas
- React 19 (via Vite)
- Vite (dev server, build)
- React Router Dom (routing)
- Plain CSS (component and global styles in `src/styles/globals.css`)
- LocalStorage para persistencia (carrito, favoritos, auth)

## Cómo ejecutar (desarrollo)

1. Clona el repositorio y entra en la carpeta del proyecto:
```powershell
git clone https://github.com/PMIglesias/REJS-Pre-Entrega
cd "REJS-Pre-Entrega"
```
2. Instala dependencias (Windows / PowerShell):
```powershell
npm install
```
3. Inicia el servidor de desarrollo:
```powershell
npm run dev
```
4. Abre en el navegador la URL que indique Vite (por defecto http://localhost:5173).

## Cómo probar las piezas clave rápidamente
- Listado de productos: `/accesories` o `/men` `/women`.
- Detalle de producto: haz click en una card o abre `/producto/<id>`.
- Agregar al carrito: desde la tarjeta (`ProductCard`) o desde el detalle (`ProductDetail`) — comprueba `/carrito` o `localStorage.getItem('cart')`.
- Rutas protegidas: abrir `/carrito` o `/admin` sin estar autenticado redirige a `/login`. En `/login` ingresa cualquier usuario y contraseña para acceder.

Diseñado y desarrollado por Pablo M. Iglesias

Argentina 2025