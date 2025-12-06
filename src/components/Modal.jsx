import React, { useEffect } from 'react';

export default function Modal({ title, children, onClose, footer }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={() => onClose && onClose()} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 8, padding: 20, width: '100%', maxWidth: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
        {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
      </div>
    </div>
  );
}
