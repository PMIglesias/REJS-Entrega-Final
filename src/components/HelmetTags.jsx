import { Helmet } from 'react-helmet-async';

export const HomeHelmet = () => (
  <Helmet>
    <title>Zapatería Premium | Compra Zapatos de Moda</title>
    <meta name="description" content="Tienda online de zapatos de calidad. Descubre nuestra colección de zapatos para hombre, mujer y accesorios. Envíos rápidos y seguros." />
    <meta name="keywords" content="zapatos, zapatería, tienda online, zapatos hombre, zapatos mujer, accesorios" />
    <meta property="og:title" content="Zapatería Premium | Compra Zapatos de Moda" />
    <meta property="og:description" content="Tienda online de zapatos de calidad con variedad de estilos y marcas." />
    <meta property="og:type" content="website" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
  </Helmet>
);

export const ProductsHelmet = ({ category }) => {
  const titles = {
    men: 'Zapatos para Hombre | Premium',
    women: 'Zapatos para Mujer | Premium',
    default: 'Catálogo de Productos | Premium'
  };

  const descriptions = {
    men: 'Encuentra los mejores zapatos para hombre. Amplia selección de marcas y estilos.',
    women: 'Descubre nuestra colección de zapatos para mujer. Comodidad y estilo en cada paso.',
    default: 'Explora nuestro catálogo completo de zapatos y accesorios.'
  };

  return (
    <Helmet>
      <title>{titles[category] || titles.default}</title>
      <meta name="description" content={descriptions[category] || descriptions.default} />
      <meta property="og:title" content={titles[category] || titles.default} />
      <meta property="og:description" content={descriptions[category] || descriptions.default} />
    </Helmet>
  );
};

export const ProductDetailHelmet = ({ product }) => (
  <Helmet>
    <title>{product?.title_es} | Premium Zapatería</title>
    <meta name="description" content={`${product?.title_es} - ${product?.description || 'Producto de calidad'}. Precio: $${product?.price}`} />
    <meta property="og:title" content={product?.title_es} />
    <meta property="og:description" content={product?.description} />
    <meta property="og:image" content={product?.img?.[0]} />
    <meta property="og:type" content="product" />
  </Helmet>
);

export const CartHelmet = () => (
  <Helmet>
    <title>Carrito de Compras | Premium</title>
    <meta name="description" content="Revisa y completa tu compra en nuestra tienda online." />
    <meta property="og:title" content="Carrito de Compras | Premium" />
  </Helmet>
);

export const LoginHelmet = () => (
  <Helmet>
    <title>Iniciar Sesión | Premium</title>
    <meta name="description" content="Inicia sesión en tu cuenta para acceder a tus pedidos y favoritos." />
    <meta property="og:title" content="Iniciar Sesión | Premium" />
  </Helmet>
);

export const RegisterHelmet = () => (
  <Helmet>
    <title>Crear Cuenta | Premium</title>
    <meta name="description" content="Crea una nueva cuenta para disfrutar de nuestros servicios." />
    <meta property="og:title" content="Crear Cuenta | Premium" />
  </Helmet>
);

export const ContactHelmet = () => (
  <Helmet>
    <title>Contacto | Premium</title>
    <meta name="description" content="Ponte en contacto con nuestro equipo de atención al cliente. Estamos aquí para ayudarte." />
    <meta property="og:title" content="Contacto | Premium" />
  </Helmet>
);

export const FAQHelmet = () => (
  <Helmet>
    <title>Preguntas Frecuentes | Premium</title>
    <meta name="description" content="Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios." />
    <meta property="og:title" content="Preguntas Frecuentes | Premium" />
  </Helmet>
);

export const ShippingHelmet = () => (
  <Helmet>
    <title>Envíos y Devoluciones | Premium</title>
    <meta name="description" content="Conoce nuestras políticas de envío y devolución. Garantía de satisfacción garantizada." />
    <meta property="og:title" content="Envíos y Devoluciones | Premium" />
  </Helmet>
);

export const AdminHelmet = () => (
  <Helmet>
    <title>Panel de Administración | Premium</title>
    <meta name="description" content="Gestiona productos, usuarios y pedidos desde tu panel administrativo." />
    <meta property="og:title" content="Panel de Administración | Premium" />
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
);
