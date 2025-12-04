import React from 'react';

const UserProfile = () => {
  return (
    <div>
      <h2 className="mb-4">Información Personal</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="name" defaultValue="John Doe" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="email" defaultValue="john.doe@example.com" />
        </div>
        <button type="submit" className="btn btn-dark">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UserProfile;
