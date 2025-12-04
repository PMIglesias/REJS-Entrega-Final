import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, LayoutDashboard, Box, UserCog } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import adminData from '../db/adminData.json';
import usersData from '../db/users.json';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981'];

const iconMap = {
  DollarSign: DollarSign,
  ShoppingCart: ShoppingCart,
  Users: Users,
  Package: Package
};
const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [productForm, setProductForm] = useState({
    title_es: '',
    vendor: '',
    price: '',
    img: ['']
  });
  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    fetch('/data/catalog_shoes_store.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.title_es?.toLowerCase().includes(searchLower) ||
      product.title?.toLowerCase().includes(searchLower) ||
      product.vendor?.toLowerCase().includes(searchLower) ||
      product.id?.toLowerCase().includes(searchLower)
    );
  });

  const showConfirmation = (message, onConfirm) => {
    setConfirmAction({ message, onConfirm });
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (confirmAction?.onConfirm) {
      confirmAction.onConfirm();
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleDeleteProduct = (productId) => {
    showConfirmation(
      '¿Estás seguro de que deseas eliminar este producto?',
      () => {
        setProducts(products.filter(p => p.id !== productId));
        showConfirmation('Producto eliminado exitosamente', null);
      }
    );
  };

  const handleDeleteUser = (userId) => {
    showConfirmation(
      '¿Estás seguro de que deseas eliminar este usuario?',
      () => {
        setUsers(users.filter(u => u.id !== userId));
        showConfirmation('Usuario eliminado exitosamente', null);
      }
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...productForm,
      id: `PROD-${Date.now()}`,
      price: parseFloat(productForm.price) || 0,
      addedBy: user?.id || 'admin',
      addedByName: user?.username || 'Admin',
      addedAt: new Date().toISOString()
    };
    setProducts([newProduct, ...products]);
    setShowAddProductModal(false);
    setProductForm({ title_es: '', vendor: '', price: '', img: [''] });
    showConfirmation('Producto agregado exitosamente', null);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(p => 
      p.id === selectedProduct.id ? { ...selectedProduct, ...productForm, price: parseFloat(productForm.price) } : p
    ));
    setShowEditProductModal(false);
    setSelectedProduct(null);
    setProductForm({ title_es: '', vendor: '', price: '', img: [''] });
    showConfirmation('Producto actualizado exitosamente', null);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUsers(users.map(u => 
      u.id === selectedUser.id ? { ...selectedUser, ...userForm } : u
    ));
    setShowEditUserModal(false);
    setSelectedUser(null);
    setUserForm({ id: '', name: '', email: '', role: 'user' });
    showConfirmation('Usuario actualizado exitosamente', null);
  };

  const openEditProductModal = (product) => {
    setSelectedProduct(product);
    setProductForm({
      title_es: product.title_es || product.title,
      vendor: product.vendor,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      img: product.img || ['']
    });
    setShowEditProductModal(true);
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setUserForm({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowEditUserModal(true);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#111827', marginBottom: '0.5rem', fontSize: '1.875rem', fontWeight: 'bold' }}>Panel de Administración</h2>
        <p style={{ color: '#4b5563' }}>Gestiona tu tienda y monitorea el rendimiento</p>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #e5e7eb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'dashboard' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === 'dashboard' ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === 'dashboard' ? '600' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              marginBottom: '-2px'
            }}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'products' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === 'products' ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === 'products' ? '600' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              marginBottom: '-2px'
            }}
          >
            <Box size={18} />
            Productos
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'users' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === 'users' ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === 'users' ? '600' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              marginBottom: '-2px'
            }}
          >
            <UserCog size={18} />
            Usuarios
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {adminData.stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              const bgColors = ['#dcfce7', '#dbeafe', '#f3e8ff', '#fed7aa'];
              const iconColors = ['#16a34a', '#2563eb', '#9333ea', '#ea580c'];
              
              return (
                <div key={index} style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ backgroundColor: bgColors[index], padding: '0.75rem', borderRadius: '0.5rem' }}>
                      <Icon style={{ color: iconColors[index], width: '24px', height: '24px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: stat.trend.dir === 'up' ? '#16a34a' : '#dc2626' }}>
                      {stat.trend.dir === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span style={{ fontSize: '0.875rem' }}>{stat.trend.value}%</span>
                    </div>
                  </div>
                  <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{stat.title}</p>
                  <p style={{ color: '#111827', fontSize: '1.25rem', fontWeight: 'bold' }}>{stat.value}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>vs. mes anterior</p>
                </div>
              );
            })}
          </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Ventas y Pedidos Chart */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem', gridColumn: 'span 2' }}>
          <h3 style={{ color: '#111827', marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 'bold' }}>Ventas y Pedidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminData.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="ventas" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
              <Line type="monotone" dataKey="pedidos" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6' }} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
              <span style={{ color: '#4b5563' }}>Ventas ($)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></div>
              <span style={{ color: '#4b5563' }}>Pedidos</span>
            </div>
          </div>
        </div>

        {/* Pie Chart - Categorías */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <h3 style={{ color: '#111827', marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 'bold' }}>Ventas por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adminData.categorySalesComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Bar dataKey="ventas" radius={[8, 8, 0, 0]}>
                {adminData.categorySalesComparison.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {adminData.categorySalesComparison.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <span style={{ color: '#4b5563' }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recent Orders */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold' }}>Pedidos Recientes</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563' }}>ID</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563' }}>Cliente</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563' }}>Total</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563' }}>Estado</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                {adminData.recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem 1.5rem', color: '#111827' }}>{order.id}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#111827' }}>{order.customer}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#111827' }}>${order.total}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        backgroundColor: order.status === 'Completado' ? '#dcfce7' :
                                        order.status === 'Enviado' ? '#dbeafe' :
                                        '#fef3c7',
                        color: order.status === 'Completado' ? '#166534' :
                               order.status === 'Enviado' ? '#1e40af' :
                               '#92400e'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold' }}>Productos Más Vendidos</h3>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {adminData.topProducts.map((adminProduct, index) => {
              const catalogProduct = getProductById(adminProduct.id);
              const imageUrl = catalogProduct?.img?.[0] || 'https://via.placeholder.com/64';
              
              return (
                <div key={adminProduct.id} style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                  <img
                    src={imageUrl}
                    alt={adminProduct.title_es}
                    style={{ width: '64px', height: '64px', borderRadius: '0.5rem', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link 
                      to={`/producto/${adminProduct.id}`}
                      style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                      <p style={{ color: '#111827', marginBottom: '0.25rem', fontWeight: '500', textDecoration: 'underline' }}>{adminProduct.title_es}</p>
                    </Link>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>{adminProduct.sold} vendidos</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#111827', fontWeight: 'bold' }}>${adminProduct.revenue.toLocaleString()}</p>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>ingresos</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
        </>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Lista de Productos</h3>
              <button
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                onClick={() => setShowAddProductModal(true)}
              >
                + Agregar Producto
              </button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Buscar por nombre, marca o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.625rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                {filteredProducts.length} de {products.length} productos
              </span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>ID</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Imagen</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Nombre</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Marca</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Precio</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.slice(0, 20).map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.75rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.id}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <img 
                        src={product.img?.[0]} 
                        alt={product.title_es}
                        style={{ width: '50px', height: '50px', borderRadius: '0.375rem', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/placeholder.svg'; }}
                      />
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#111827', fontWeight: '500' }}>
                      {product.title_es || product.title}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#6b7280' }}>
                      {product.vendor}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#111827', fontWeight: '600' }}>
                      {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <Link 
                          to={`/producto/${product.id}`}
                          style={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          Ver
                        </Link>
                        <span style={{ color: '#d1d5db' }}>|</span>
                        <button
                          onClick={() => openEditProductModal(product)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10b981',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            padding: 0
                          }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          Editar
                        </button>
                        <span style={{ color: '#d1d5db' }}>|</span>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            padding: 0
                          }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
            Mostrando {Math.min(20, filteredProducts.length)} de {filteredProducts.length} productos {searchTerm && `(filtrados de ${products.length} totales)`}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Lista de Usuarios</h3>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total: {users.length} usuarios</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>ID</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Nombre</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Email</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Rol</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Estado</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#4b5563', fontWeight: '600', fontSize: '0.875rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                      {user.id}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: '0.875rem'
                        }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ color: '#111827', fontWeight: '500' }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#6b7280' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        backgroundColor: user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                        color: user.role === 'admin' ? '#92400e' : '#1e40af'
                      }}>
                        {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        backgroundColor: '#dcfce7',
                        color: '#166534'
                      }}>
                        Activo
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button
                          onClick={() => openEditUserModal(user)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10b981',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            padding: 0
                          }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          Editar
                        </button>
                        <span style={{ color: '#d1d5db' }}>|</span>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            padding: 0
                          }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para Agregar Producto */}
      {showAddProductModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowAddProductModal(false)}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Agregar Nuevo Producto
            </h3>
            <form onSubmit={handleAddProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title_es}
                  onChange={(e) => setProductForm({ ...productForm, title_es: e.target.value })}
                  placeholder="Ej: Zapatillas Deportivas"
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Marca *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.vendor}
                  onChange={(e) => setProductForm({ ...productForm, vendor: e.target.value })}
                  placeholder="Ej: Nike"
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Precio *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="99.99"
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  URL de la Imagen
                </label>
                <input
                  type="url"
                  value={productForm.img[0]}
                  onChange={(e) => setProductForm({ ...productForm, img: [e.target.value] })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProductModal(false);
                    setProductForm({ title_es: '', vendor: '', price: '', img: [''] });
                  }}
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Agregar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Editar Producto */}
      {showEditProductModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowEditProductModal(false)}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Editar Producto
            </h3>
            <form onSubmit={handleEditProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title_es}
                  onChange={(e) => setProductForm({ ...productForm, title_es: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Marca *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.vendor}
                  onChange={(e) => setProductForm({ ...productForm, vendor: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Precio *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  URL de la Imagen
                </label>
                <input
                  type="url"
                  value={productForm.img[0]}
                  onChange={(e) => setProductForm({ ...productForm, img: [e.target.value] })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditProductModal(false);
                    setSelectedProduct(null);
                    setProductForm({ title_es: '', vendor: '', price: '', img: [''] });
                  }}
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Editar Usuario */}
      {showEditUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowEditUserModal(false)}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Editar Usuario
            </h3>
            <form onSubmit={handleEditUser}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  ID del Usuario
                </label>
                <input
                  type="text"
                  disabled
                  value={userForm.id}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: '#f9fafb',
                    color: '#6b7280'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Rol *
                </label>
                <select
                  required
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditUserModal(false);
                    setSelectedUser(null);
                    setUserForm({ id: '', name: '', email: '', role: 'user' });
                  }}
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowConfirmModal(false)}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#111827', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {confirmAction?.onConfirm ? 'Confirmación' : 'Éxito'}
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {confirmAction?.message}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              {confirmAction?.onConfirm ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirmModal(false);
                      setConfirmAction(null);
                    }}
                    style={{
                      padding: '0.625rem 1.25rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    style={{
                      padding: '0.625rem 1.25rem',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Confirmar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmModal(false);
                    setConfirmAction(null);
                  }}
                  style={{
                    padding: '0.625rem 1.25rem',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Aceptar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
