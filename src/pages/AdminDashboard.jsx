import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, LayoutDashboard, Box, UserCog } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { toast } from '../utils/notify';
import adminData from '../db/adminData.json';
import usersData from '../db/users.json';
import { API_BASE, productsEndpoint } from '../config/api';

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
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
    img: [''],
    description: ''
  });
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const { productsEndpoint } = await import('../config/api');
        const url = productsEndpoint();
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setErrorProducts(err.message || String(err));
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {

    setUsers(usersData);
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      product.title_es?.toLowerCase().includes(searchLower) ||
      product.title?.toLowerCase().includes(searchLower) ||
      product.vendor?.toLowerCase().includes(searchLower) ||
      product.id?.toLowerCase().includes(searchLower)
    );

    const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(product.category);
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categories = [...new Set(products.map(p => p.category))].sort();

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pagedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const validTopProducts = adminData.topProducts.filter(p => getProductById(p.id));

  const showConfirmation = (message, onConfirm) => {
    setConfirmAction({ message, onConfirm });
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (confirmAction?.onConfirm) {
      try {
        const result = await confirmAction.onConfirm();
        setShowConfirmModal(false);
        setConfirmAction(null);
        if (result) {
          if (String(result).toLowerCase().startsWith('error')) toast.error(result);
          else toast.success(result);
        }
      } catch (err) {
        console.error(err);
        setShowConfirmModal(false);
        setConfirmAction(null);
        toast.error('Error: ' + err.message);
      }
    } else {
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
  };

  const handleDeleteProduct = (productId) => {
    showConfirmation(
      '¿Estás seguro de que deseas eliminar este producto?',
      async () => {
        try {
          if (API_BASE) {
            const url = `${productsEndpoint()}/${productId}`;
            const res = await fetch(url, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error al eliminar en MockAPI');
          }
          setProducts(products.filter(p => p.id !== productId));
          return 'Producto eliminado exitosamente';
        } catch (err) {
          console.error(err);
          return 'Error al eliminar producto: ' + err.message;
        }
      }
    );
  };

  const handleDeleteUser = (userId) => {
    showConfirmation(
      '¿Estás seguro de que deseas eliminar este usuario?',
      async () => {
        try {
          setUsers(users.filter(u => u.id !== userId));
          return 'Usuario eliminado exitosamente';
        } catch (err) {
          console.error(err);
          return 'Error al eliminar usuario: ' + err.message;
        }
      }
    );
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productForm.title_es || String(productForm.title_es).trim().length === 0) {
      toast.error('El nombre del producto es obligatorio');
      return;
    }
    const priceVal = parseFloat(productForm.price) || 0;
    if (priceVal <= 0) {
      toast.error('El precio debe ser mayor a 0');
      return;
    }

    const imgUrls = Array.isArray(productForm.img) 
      ? productForm.img.filter(url => url && String(url).trim().length > 0)
      : [];

    const payload = {
      title_es: productForm.title_es,
      vendor: productForm.vendor || '',
      price: priceVal,
      img: imgUrls.length > 0 ? imgUrls : ['/placeholder.svg'],
      description: productForm.description || 'Sin descripción',
      addedBy: user?.id || 'admin',
      addedByName: user?.username || 'Admin',
      addedAt: new Date().toISOString(),
      category: 'mens-shoes'
    };

    try {
      let created = null;
      if (API_BASE) {
        const res = await fetch(productsEndpoint(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Error al crear producto en MockAPI');
        created = await res.json();
      } else {
        created = { id: `PROD-${Date.now()}`, ...payload };
      }

      setProducts([created, ...products]);
      setShowAddProductModal(false);
      setProductForm({ title_es: '', vendor: '', price: '', img: [''], description: '' });
      toast.success('Producto agregado exitosamente');
    } catch (err) {
      console.error(err);
      toast.error('Error al agregar producto: ' + err.message);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {

      if (!productForm.title_es || String(productForm.title_es).trim().length === 0) {
        toast.error('El nombre del producto es obligatorio');
        return;
      }
      const priceVal = parseFloat(productForm.price) || 0;
      if (priceVal <= 0) {
        toast.error('El precio debe ser mayor a 0');
        return;
      }

      const imgUrls = Array.isArray(productForm.img) 
        ? productForm.img.filter(url => url && String(url).trim().length > 0)
        : [];

      const updated = { 
        ...selectedProduct, 
        ...productForm, 
        price: priceVal, 
        img: imgUrls.length > 0 ? imgUrls : ['/placeholder.svg'],
        description: productForm.description || 'Sin descripción'
      };
      if (API_BASE) {
        const url = `${productsEndpoint()}/${selectedProduct.id}`;
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
        if (!res.ok) throw new Error('Error al actualizar en MockAPI');
        const body = await res.json();
        setProducts(products.map(p => p.id === selectedProduct.id ? body : p));
      } else {
        setProducts(products.map(p => p.id === selectedProduct.id ? updated : p));
      }

      setShowEditProductModal(false);
      setSelectedProduct(null);
      setProductForm({ title_es: '', vendor: '', price: '', img: [''], description: '' });
      toast.success('Producto actualizado exitosamente');
    } catch (err) {
      console.error(err);
      toast.error('Error al actualizar producto: ' + err.message);
    }
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    try {
      const updated = { ...selectedUser, ...userForm };
      setUsers(users.map(u => u.id === selectedUser.id ? updated : u));
      setShowEditUserModal(false);
      setSelectedUser(null);
      setUserForm({ id: '', name: '', email: '', role: 'user' });
      toast.success('Usuario actualizado exitosamente');
    } catch (err) {
      console.error(err);
      toast.error('Error al actualizar usuario: ' + err.message);
    }
  };

  const openEditProductModal = (product) => {
    setSelectedProduct(product);
    setProductForm({
      title_es: product.title_es || product.title,
      vendor: product.vendor,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      img: product.img || [''],
      description: product.description || product.description_es || ''
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

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#111827', marginBottom: '0.5rem', fontSize: '1.875rem', fontWeight: 'bold' }}>Panel de Administración</h2>
        <p style={{ color: '#4b5563' }}>Gestiona tu tienda y monitorea el rendimiento</p>
      </div>

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

      {activeTab === 'dashboard' && (
        <>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>

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
                    <td style={{ padding: '1rem 1.5rem', color: '#111827' }}>{'$' + order.total}</td>
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

        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 'bold' }}>Productos Más Vendidos</h3>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {validTopProducts.map((adminProduct, index) => {
              const catalogProduct = getProductById(adminProduct.id);
              const imageUrl = catalogProduct?.img?.[0] || '/placeholder.svg';
              
              return (
                <div key={adminProduct.id} style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                  <img
                    src={imageUrl}
                    alt={adminProduct.title_es}
                    style={{ width: '64px', height: '64px', borderRadius: '0.5rem', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/placeholder.svg'; }}
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

      {activeTab === 'products' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {loadingProducts ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Cargando productos...</p>
            </div>
          ) : errorProducts ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: '#dc2626', fontSize: '1.1rem', marginBottom: '1rem' }}>Error al cargar productos: {errorProducts}</p>
              <button
                onClick={() => window.location.reload()}
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
                Reintentar
              </button>
            </div>
          ) : (
            <>
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

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Filtrar por categoría:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '600' }}>Zapatos</span>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <span style={{ color: '#4b5563', fontSize: '0.875rem', userSelect: 'none' }}>Hombre</span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('mens-shoes')}
                      onChange={() => handleCategoryToggle('mens-shoes')}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#3b82f6' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <span style={{ color: '#4b5563', fontSize: '0.875rem', userSelect: 'none' }}>Mujer</span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('womens-shoes')}
                      onChange={() => handleCategoryToggle('womens-shoes')}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#3b82f6' }}
                    />
                  </label>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                    <span style={{ color: '#111827', fontSize: '0.875rem', fontWeight: '600' }}>Accesorios</span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('accessories')}
                      onChange={() => handleCategoryToggle('accessories')}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#3b82f6' }}
                    />
                  </div>
                </div>
              </div>
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
                {pagedProducts.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.75rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.id}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <img 
                        src={product.img?.[0] || '/placeholder.svg'} 
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

          <div style={{ padding: '12px 1.5rem', display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: currentPage === 1 ? '#f3f4f6' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              &lt;
            </button>
            {(() => {
              const pages = [];
              const maxPagesToShow = 5;
              if (pageCount <= maxPagesToShow) {
                for (let i = 1; i <= pageCount; i++) pages.push(i);
              } else {
                if (currentPage <= 3) pages.push(1,2,3,4,'...',pageCount);
                else if (currentPage >= pageCount - 2) pages.push(1,'...', pageCount-3, pageCount-2, pageCount-1, pageCount);
                else pages.push(1,'...', currentPage, currentPage+1, '...', pageCount);
              }
              return pages.map((p, idx) => (
                <button key={idx} onClick={() => typeof p === 'number' && setCurrentPage(p)}
                        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: p === currentPage ? '#3b82f6' : '#fff', color: p === currentPage ? '#fff' : '#111', cursor: typeof p === 'number' ? 'pointer' : 'default' }}>
                  {p}
                </button>
              ));
            })()}
            <button
              onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: currentPage === pageCount ? '#f3f4f6' : '#fff', cursor: currentPage === pageCount ? 'not-allowed' : 'pointer' }}
            >
              &gt;
            </button>
          </div>
            </>
          )}
        </div>
      )}

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

      {showAddProductModal && (
        <Modal title="Agregar Nuevo Producto" onClose={() => setShowAddProductModal(false)}>
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
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Descripción *
                </label>
                <textarea
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Descripción del producto (mínimo 10 caracteres)"
                  rows={4}
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
                    setProductForm({ title_es: '', vendor: '', price: '', img: [''], description: '' });
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
        </Modal>
      )}

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
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Descripción *
                </label>
                <textarea
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={4}
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
                    setProductForm({ title_es: '', vendor: '', price: '', img: [''], description: '' });
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

      {showEditUserModal && (
        <Modal title="Editar Usuario" onClose={() => setShowEditUserModal(false)}>
          <form onSubmit={handleEditUser}>
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
        </Modal>
      )}

      {showConfirmModal && (
        <Modal title={confirmAction?.onConfirm ? 'Confirmación' : 'Mensaje'} onClose={() => setShowConfirmModal(false)}>
          <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: '1.5' }}>{confirmAction?.message}</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            {confirmAction?.onConfirm ? (
              <>
                <button type="button" onClick={() => { setShowConfirmModal(false); setConfirmAction(null); }} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>Cancelar</button>
                <button type="button" onClick={handleConfirm} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>Confirmar</button>
              </>
            ) : (
              <button type="button" onClick={() => { setShowConfirmModal(false); setConfirmAction(null); }} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>Aceptar</button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
