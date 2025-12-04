import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ordersData from '../../db/orders.json';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userOrders = ordersData.filter(order => order.userId === 1);
    setOrders(userOrders);
  }, []);

  return (
    <div>
      <h2 className="mb-4">Historial de Pedidos</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID Pedido</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td><span className="badge bg-primary">{order.status}</span></td>
              <td>${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</td>
              <td>
                <Link to={`${order.id}`} className="btn btn-dark btn-sm">Ver Detalles</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
