import React from 'react';

const faqs = [
	{ q: '¿Cuánto tarda el envío?', a: 'Los envíos suelen tardar entre 3-7 días hábiles dependiendo de la ubicación.' },
	{ q: '¿Puedo devolver un producto?', a: 'Sí, aceptamos devoluciones dentro de los 30 días si el producto está en condiciones originales.' },
	{ q: '¿Cómo puedo rastrear mi pedido?', a: 'Usa la página de Seguimiento e introduce tu ID de pedido.' }
];

export default function FAQ() {
	return (
		<main style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
			<h1>Preguntas Frecuentes (FAQs)</h1>
			<section style={{ marginTop: 16 }}>
				{faqs.map((f, i) => (
					<div key={i} style={{ marginBottom: 12 }}>
						<p style={{ fontWeight: 700 }}>{f.q}</p>
						<p style={{ color: '#555' }}>{f.a}</p>
					</div>
				))}
			</section>
		</main>
	);
}

