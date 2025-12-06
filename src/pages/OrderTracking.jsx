import React, { useState } from 'react';

export default function OrderTracking() {
	const [orderId, setOrderId] = useState('');
	const [result, setResult] = useState(null);

	const handleTrack = (e) => {
		e.preventDefault();

		setResult({ id: orderId, status: 'En tránsito', expected: '3-5 días' });
	};

	return (
		<main style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
			<h1>Seguimiento de Pedido</h1>
			<form onSubmit={handleTrack} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
				<input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="ID de pedido" style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
				<button style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 6 }}>Buscar</button>
			</form>
			{result && (
				<div style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
					<p><strong>Pedido:</strong> {result.id}</p>
					<p><strong>Estado:</strong> {result.status}</p>
					<p><strong>Estimado:</strong> {result.expected}</p>
				</div>
			)}
		</main>
	);
}
