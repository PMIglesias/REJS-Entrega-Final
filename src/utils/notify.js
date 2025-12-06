
const getToastModule = async () => {
  try {
    const mod = await import('react-toastify');
    return mod.toast || (mod.default && mod.default.toast) || null;
  } catch (err) {
    console.warn('react-toastify not available:', err && err.message);
    return null;
  }
};

const callToast = async (method, ...args) => {
  const t = await getToastModule();
  if (t && typeof t[method] === 'function') {
    try { t[method](...args); } catch (e) { console.error('toast call failed', e); }
  } else {
    const msg = args[0];
    if (method === 'error') {
      alert(String(msg));
      console.error('Toast error (fallback):', msg);
    } else {
      console.log('Toast fallback', method, msg);
    }
  }
};

export const toast = {
  success: (...a) => callToast('success', ...a),
  error: (...a) => callToast('error', ...a),
  info: (...a) => callToast('info', ...a),
  warn: (...a) => callToast('warn', ...a),
  warning: (...a) => callToast('warning', ...a),
  dismiss: async (id) => {
    const t = await getToastModule();
    if (t && typeof t.dismiss === 'function') t.dismiss(id);
  }
};

export default toast;
