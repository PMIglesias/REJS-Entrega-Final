import React from 'react';

const UserPreferences = () => {
  return (
    <div>
      <h2 className="mb-4">Preferencias</h2>
      <form>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="newsletter" defaultChecked />
          <label className="form-check-label" htmlFor="newsletter">
            Suscribirse al boletín
          </label>
        </div>
        <button type="submit" className="btn btn-dark mt-3">Guardar Preferencias</button>
      </form>
    </div>
  );
};

export default UserPreferences;
