// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VALIDATE_TOKEN: "/auth/validate",
    REFRESH_TOKEN: "/auth/refresh",

    // Menu endpoints
    MENU_ITEMS: "/menu",
    MENU_ITEM: "/menu", // /{id}
    MENU_CATEGORIES: "/menu/categories",

    // Orders endpoints
    ORDERS: "/orders",
    ORDER: "/orders", // /{id}
    ORDER_STATUS: "/orders", // /{id}/status

    // Reservations endpoints
    RESERVATIONS: "/reservations",
    RESERVATION: "/reservations", // /{id}
    RESERVATION_STATUS: "/reservations", // /{id}/status

    // Analytics endpoints
    ANALYTICS: "/analytics",
    ANALYTICS_DASHBOARD: "/analytics/dashboard",

    // User endpoints
    USERS: "/users",
    USER_PROFILE: "/users/profile",
  },
};

// Request configuration
export const REQUEST_CONFIG = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("savoria_auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function to build full URL
export const buildUrl = (
  endpoint: string,
  pathParams?: Record<string, string>,
) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;

  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }

  return url;
};
