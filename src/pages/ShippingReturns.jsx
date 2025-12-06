import React from 'react';

export default function ShippingReturns() {
	return (
		<main style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
			<h1>Envíos y Devoluciones</h1>
			<p>Información sobre plazos de envío, costos y política de devoluciones.</p>
			<section style={{ marginTop: 16 }}>
				<h3>Envíos</h3>
				<p>Los pedidos suelen procesarse en 1-2 días hábiles. Los tiempos de entrega dependen de la ubicación.</p>
				<h3 style={{ marginTop: 12 }}>Devoluciones</h3>
				<p>Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto, siempre que estén en su estado original.</p>
			</section>
		</main>
	);
}
