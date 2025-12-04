import React from 'react';

const UserAddresses = () => {
  return (
    <div>
      <h2 className="mb-4">Direcciones</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Dirección de Envío</h5>
          <p className="card-text">123 Main St, Anytown, USA 12345</p>
          <button className="btn btn-dark">Editar</button>
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
