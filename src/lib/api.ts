const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Hero API
export const heroApi = {
  get: async () => {
    const response = await fetch(`${API_URL}/hero`);
    if (!response.ok) throw new Error('Failed to fetch hero data');
    return response.json();
  },

  update: async (data: {
    trustBadge: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    backgroundImage: string;
  }) => {
    const response = await fetch(`${API_URL}/hero`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update hero data');
    return response.json();
  },
};

// Products API
export const productsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/products/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update product: ${response.status}`);
    }
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },
};

// Orders API
export const ordersApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  updateStatus: async (id: string, status: string) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/orders/stats/summary`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },
};
