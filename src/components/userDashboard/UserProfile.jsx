import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import { toast } from '../../utils/notify';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: user?.username || '', email: user?.email || '' });

  const open = () => {
    setForm({ name: user?.username || '', email: user?.email || '' });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error('Nombre y email son obligatorios');
      return;
    }
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(form.email)) {
      toast.error('Correo inválido');
      return;
    }

    updateProfile({ username: form.name, email: form.email });
    setShowModal(false);
    toast.success('Perfil actualizado');
  };

  return (
    <div>
      <h2 className="mb-4">Información Personal</h2>
      <div className="card">
        <div className="card-body">
          <p><strong>Nombre:</strong> {user?.username || '—'}</p>
          <p><strong>Email:</strong> {user?.email || '—'}</p>
          <button className="btn btn-dark" onClick={open}>Editar Perfil</button>
        </div>
      </div>

      {showModal && (
        <Modal title="Editar Perfil" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
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

export default UserProfile;
