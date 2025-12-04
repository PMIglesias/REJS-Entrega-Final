import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFav } from '../../context/FavContext';
import { Link } from 'react-router-dom';
import { Package, Heart, CreditCard, Clock, User, MapPin } from 'lucide-react';
import dashboardData from '../../db/dashboardData.json';

const DashboardSummary = () => {
  const { user } = useAuth();
  const { favorites } = useFav();
  const { stats, recentOrders, userAddress } = dashboardData;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Entregado': return { bg: '#dcfce7', color: '#166534' };
      case 'En tránsito': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Procesando': return { bg: '#fef3c7', color: '#92400e' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#111827', marginBottom: '0.5rem', fontSize: '1.875rem', fontWeight: 'bold' }}>
          Bienvenido de nuevo, {user?.name || 'Usuario'}
        </h2>
        <p style={{ color: '#6b7280' }}>Gestiona tus pedidos, favoritos y configuración de cuenta</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <Package style={{ color: '#2563eb', width: '24px', height: '24px' }} />
            </div>
          </div>
          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Pedidos Totales</p>
          <p style={{ color: '#111827', fontSize: '1.875rem', fontWeight: 'bold' }}>{stats.totalOrders}</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#fce7f3', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <Heart style={{ color: '#db2777', width: '24px', height: '24px' }} />
            </div>
          </div>
          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Favoritos</p>
          <p style={{ color: '#111827', fontSize: '1.875rem', fontWeight: 'bold' }}>{favorites.length}</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#dcfce7', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <CreditCard style={{ color: '#16a34a', width: '24px', height: '24px' }} />
            </div>
          </div>
          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Total Gastado</p>
          <p style={{ color: '#111827', fontSize: '1.875rem', fontWeight: 'bold' }}>
            ${stats.totalSpent.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#fed7aa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <Clock style={{ color: '#ea580c', width: '24px', height: '24px' }} />
            </div>
          </div>
          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Pedidos Pendientes</p>
          <p style={{ color: '#111827', fontSize: '1.875rem', fontWeight: 'bold' }}>{stats.pendingOrders}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Orders Section */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Pedidos Recientes</h3>
            </div>
            <div>
              {recentOrders.map((order) => (
                <div key={order.id} style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div>
                      <p style={{ color: '#111827', marginBottom: '0.25rem', fontWeight: '600' }}>{order.id}</p>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{order.date}</p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      backgroundColor: getStatusColor(order.status).bg,
                      color: getStatusColor(order.status).color
                    }}>
                      {order.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{order.items} artículos</p>
                    <p style={{ color: '#111827', fontWeight: '700', margin: 0 }}>${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <Link to="/user-dashboard/orders" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  padding: '0.625rem 1rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}>
                  Ver Todos los Pedidos
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)', 
                padding: '1rem', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User style={{ color: '#fff', width: '32px', height: '32px' }} />
              </div>
              <div>
                <p style={{ color: '#111827', fontWeight: '600', margin: 0, marginBottom: '0.25rem' }}>
                  {user?.name || 'Usuario'}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                  {user?.email || 'email@ejemplo.com'}
                </p>
              </div>
            </div>
            <Link to="/user-dashboard/profile" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                padding: '0.625rem 1rem',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>
                Editar Perfil
              </button>
            </Link>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', marginBottom: '1rem' }}>
              <MapPin style={{ color: '#9ca3af', width: '20px', height: '20px', marginTop: '0.25rem' }} />
              <div>
                <p style={{ color: '#111827', fontWeight: '600', margin: 0, marginBottom: '0.25rem' }}>
                  Dirección de Envío
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
                  {userAddress.street}<br />
                  {userAddress.city}, {userAddress.postalCode}<br />
                  {userAddress.country}
                </p>
              </div>
            </div>
            <Link to="/user-dashboard/addresses" style={{ color: '#3b82f6', fontSize: '0.875rem', textDecoration: 'none', fontWeight: '500' }}
                  onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.color = '#3b82f6'}>
              Editar dirección
            </Link>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Mis Favoritos</h3>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {favorites.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {favorites.slice(0, 3).map((product) => (
                <Link key={product.id || product.url} to={`/producto/${encodeURIComponent(product.id || product.url)}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ cursor: 'pointer', position: 'relative' }}>
                    <div style={{ 
                      position: 'relative', 
                      overflow: 'hidden', 
                      borderRadius: '0.5rem', 
                      marginBottom: '1rem', 
                      backgroundColor: '#f3f4f6',
                      aspectRatio: '4/3'
                    }}>
                      <img
                        src={product.img?.[0]}
                        alt={product.title_es}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        onError={(e) => { e.target.src = '/placeholder.svg'; }}
                      />
                      <button style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        backgroundColor: '#fff',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}>
                        <Heart style={{ color: '#ef4444', width: '20px', height: '20px' }} fill="currentColor" />
                      </button>
                    </div>
                    <p style={{ color: '#111827', fontWeight: '500', margin: 0, marginBottom: '0.25rem' }}>
                      {product.title_es}
                    </p>
                    <p style={{ color: '#111827', fontWeight: '700', margin: 0 }}>
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280', margin: 0 }}>Aún no has añadido ningún producto a tus favoritos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
