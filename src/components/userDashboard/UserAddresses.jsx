import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import { toast } from '../../utils/notify';

const STORAGE_KEY = 'user_addresses';

const UserAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ street: '', city: '', state: '', zip: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const userAddrs = (parsed && parsed[user?.id]) || [];
      setAddresses(userAddrs);
    } catch (e) {
      setAddresses([]);
    }
  }, [user]);

  const openAdd = () => {
    setForm({ street: '', city: '', state: '', zip: '' });
    setShowModal(true);
  };

  const saveAddress = (e) => {
    e.preventDefault();
    if (!form.street || !form.city) {
      toast.error('Calle y ciudad son obligatorias');
      return;
    }

    const next = [...addresses, form];
    setAddresses(next);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed[user.id] = next;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch (err) {
      console.error('Error saving addresses', err);
    }
    setShowModal(false);
    toast.success('Dirección guardada');
  };

  return (
    <div>
      <h2 className="mb-4">Direcciones</h2>
      <div>
        {addresses.length === 0 ? (
          <div className="card p-3">
            <p>No tienes direcciones guardadas.</p>
            <button className="btn btn-dark" onClick={openAdd}>Agregar Dirección</button>
          </div>
        ) : (
          addresses.map((a, idx) => (
            <div className="card mb-3" key={idx}>
              <div className="card-body">
                <h5 className="card-title">Dirección #{idx + 1}</h5>
                <p className="card-text">{a.street}, {a.city}, {a.state} {a.zip}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal title="Agregar Dirección" onClose={() => setShowModal(false)}>
          <form onSubmit={saveAddress}>
            <div className="mb-2">
              <label className="form-label">Calle</label>
              <input className="form-control" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Ciudad</label>
              <input className="form-control" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Provincia/Estado</label>
              <input className="form-control" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Código Postal</label>
              <input className="form-control" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="submit" className="btn btn-dark">Guardar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserAddresses;
