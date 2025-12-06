import React from 'react';

export default function Contact() {
	return (
		<main style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
			<h1>Contacto</h1>
			<p>¿Tienes alguna consulta? Escríbenos y te responderemos lo antes posible.</p>
			<section style={{ marginTop: 16 }}>
				<p><strong>Correo:</strong> soporte@shoepassion.example</p>
				<p><strong>Teléfono:</strong> +34 900 123 456</p>
				<p><strong>Horario:</strong> Lun - Vie 9:00 - 18:00</p>
			</section>
			<form style={{ marginTop: 20, display: 'grid', gap: 12 }} onSubmit={(e) => e.preventDefault()}>
				<input type="text" placeholder="Tu nombre" style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
				<input type="email" placeholder="Tu email" style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
				<textarea placeholder="Tu mensaje" rows={6} style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
				<button style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 6 }}>Enviar mensaje</button>
			</form>
		</main>
	);
}
