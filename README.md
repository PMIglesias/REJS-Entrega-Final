# React JS Entrega Final - Tienda de Zapatos SHOEPASSION

Aplicación web de e-commerce moderna construida con **React 19**, **Vite**, **MockAPI** y **Context API**.

## Características

### Autenticación y Carrito
- Sistema de login y registro simulado con localStorage
- Carrito de compras persistente con Context API
- Rutas protegidas para usuarios autenticados

### CRUD Productos
- Gestión completa de productos (crear, leer, actualizar, eliminar)
- MockAPI para almacenamiento remoto
- Validaciones de formulario
- Modal de confirmación para eliminaciones
- Estados de carga y error

### Búsqueda y Filtrado
- Barra de búsqueda en tiempo real
- Filtros por categoría (Hombre, Mujer, Accesorios)
- Paginación de productos

### Diseño Responsivo
- Bootstrap para grid y componentes
- Styled-components para estilos personalizados
- Mobile-first design
- Iconos con React Icons

### Optimizaciones
- SEO con React Helmet
- Accesibilidad (ARIA labels, skip links)
- Notificaciones con React Toastify
- Componentes styled reutilizables

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/PMIglesias/REJS-Entrega-Final.git
cd REJS-Entrega-Final
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` y reemplaza `VITE_API_BASE_URL` con la URL de MockAPI:
```
VITE_API_BASE_URL=https://69323a92e5a9e342d26e47cd.mockapi.io/api/v1
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5175`

## Estructura del Proyecto

```
src/
├── App.jsx                    # Componente principal
├── main.jsx                   # Punto de entrada
├── components/
│   ├── Header.jsx            # Navbar
│   ├── Footer.jsx            # Footer
│   ├── ProductCard.jsx       # Tarjeta de producto
│   ├── ProductCardStyled.jsx # Tarjeta con styled-components
│   ├── Modal.jsx             # Modal reutilizable
│   ├── HelmetTags.jsx        # SEO con React Helmet
│   ├── Accessibility.jsx     # Componentes accesibles
│   └── userDashboard/        # Dashboard de usuario
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── CartPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── AdminDashboard.jsx
│   ├── Contact.jsx
│   ├── FAQ.jsx
│   ├── ShippingReturns.jsx
│   └── OrderTracking.jsx
├── context/
│   ├── AuthContext.jsx       # Autenticación
│   ├── CartContext.jsx       # Carrito
│   └── FavContext.jsx        # Favoritos
├── styles/
│   ├── globals.css
│   ├── GlobalStyles.js       # Styled components reutilizables
│   └── AdminDashboardStyles.js
├── config/
│   └── api.js                # Configuración de API
└── db/
    ├── users.json
    ├── orders.json
    └── adminData.json
```
## Autenticación

### Usuario Demo
- **Email:** user@example.com
- **Contraseña:** userpassword

### Admin Demo
- **Email:** admin@example.com
- **Contraseña:** adminpassword

Los datos se almacenan en localStorage. Al cerrar sesión, se limpian automáticamente.

## Gestión del Carrito

El carrito se gestiona globalmente con **CartContext**:
- Agregar productos
- Eliminar productos individuales
- Vaciar carrito completo
- Persistencia en localStorage

## Admin Panel

Accede al panel administrativo desde la cuenta de admin:
- **URL:** `/admin-dashboard`
- Gestiona productos (CRUD completo)
- Visualiza usuarios y pedidos
- Estadísticas de ventas

### Validaciones
- Nombre obligatorio
- Precio mayor a 0
- Descripción opcional

##  Datos

### Acceso a MockAPI
URL configurada en `.env`:
```
VITE_API_BASE_URL=https://69323a92e5a9e342d26e47cd.mockapi.io/api/v1
```

Contiene 90 productos (30 zapatos hombre, 30 zapatos mujer, 30 accesorios).

##  Diseño

### Styled Components
- `GlobalStyles.js` - Componentes reutilizables (Button, Card, Input, etc.)
- `AdminDashboardStyles.js` - Estilos del panel
- `ProductCardStyled.jsx` - Tarjeta de producto personalizada

### Bootstrap
Sistema de grillas responsivo para layouts adaptables.

##  Accesibilidad

La aplicación incluye:
- **ARIA labels** en botones y formularios
- **Form validation** con mensajes de error accesibles
- **Semantic HTML** (nav, main, section, etc.)
- **Keyboard navigation** completa

### Componentes Accesibles
```javascript
<AccessibleButton ariaLabel="Agregar al carrito">Comprar</AccessibleButton>
<AccessibleInput ariaLabel="Buscar productos" />
<AccessibleCheckbox ariaLabel="Filtrar por categoría" />
```

##  SEO

Con **React Helmet Async** (compatible con React 19) se optimizan:
- Meta titles únicos por página
- Meta descriptions
- Open Graph tags
- Keywords relevantes

##  Responsividad

Probado en:
-  Desktop (1920px+)
-  Tablet (768px - 1024px)
-  Mobile (320px - 767px)

##  Testing

Para testing manual:
```bash
npm run dev
```

Navega por:
1. Home page
2. Categorías (Hombre/Mujer)
3. Búsqueda y filtros
4. Producto individual
5. Login/Registro
6. Carrito
7. Admin panel

##  Dependencias Principales

```json
{
  "react": "^19.1.1",
  "react-router-dom": "^7.9.4",
  "react-bootstrap": "^2.10.10",
  "styled-components": "^6.x",
  "react-helmet-async": "^2.0.5",
  "react-icons": "^5.x",
  "react-toastify": "^9.1.3",
  "recharts": "^3.5.1",
  "lucide-react": "^0.555.0"
}
```

##  Despliegue

### Vercel
```bash
npm run build
vercel --prod
```
#### URL

[Rejs Entrega Final - Vercel](https://rejs-entrega-final.vercel.app/)

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### URL

[Rejs Entrega Final - Netlify](https://rejs-entrega-final.netlify.app/)

## Notas

- Los datos de usuario se cargan desde JSON local (`src/db/users.json`)
- Los datos de productos se sincronizan con MockAPI
- Las órdenes se almacenan en JSON local
- El carrito es persistente con localStorage


---
### Desarrollado para el Curso de React JS - Talento Tech 2025 