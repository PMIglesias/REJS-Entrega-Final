import React from 'react';

const UserPaymentMethods = () => {
  return (
    <div>
      <h2 className="mb-4">Métodos de Pago</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Visa terminada en 1234</h5>
          <p className="card-text">Expira 12/2025</p>
          <button className="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentMethods;
