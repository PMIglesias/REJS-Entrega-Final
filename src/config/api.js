export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export function productsEndpoint() {
  return API_BASE ? `${API_BASE}/products` : '/data/catalog_shoes_store.json';
}

export function productByIdEndpoint(id){
  return API_BASE ? `${API_BASE}/products/${id}` : '/data/catalog_shoes_store.json';
}

export function usersEndpoint() {
  return '/db/users.json';
}
