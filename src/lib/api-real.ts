import { API_CONFIG, REQUEST_CONFIG, getAuthHeaders, buildUrl } from "./config";
import {
  User,
  MenuItem,
  Order,
  Reservation,
  AnalyticsData,
  OrderItem,
} from "./mock-data";

// Generic API client
class ApiClient {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      ...REQUEST_CONFIG,
      ...options,
      headers: {
        ...REQUEST_CONFIG.headers,
        ...getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return {} as T;
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    pathParams?: Record<string, string>,
  ): Promise<T> {
    const url = buildUrl(endpoint, pathParams);
    return this.request<T>(url, { method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    pathParams?: Record<string, string>,
  ): Promise<T> {
    const url = buildUrl(endpoint, pathParams);
    return this.request<T>(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    pathParams?: Record<string, string>,
  ): Promise<T> {
    const url = buildUrl(endpoint, pathParams);
    return this.request<T>(url, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    pathParams?: Record<string, string>,
  ): Promise<T> {
    const url = buildUrl(endpoint, pathParams);
    return this.request<T>(url, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    pathParams?: Record<string, string>,
  ): Promise<T> {
    const url = buildUrl(endpoint, pathParams);
    return this.request<T>(url, { method: "DELETE" });
  }
}

const apiClient = new ApiClient();

// Auth API
export const authApi = {
  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    return apiClient.post(API_CONFIG.ENDPOINTS.LOGIN, { email, password });
  },

  async register(
    userData: Omit<User, "id" | "createdAt">,
  ): Promise<{ user: User; token: string }> {
    return apiClient.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
  },

  async validateToken(token: string): Promise<User> {
    return apiClient.get(API_CONFIG.ENDPOINTS.VALIDATE_TOKEN);
  },

  async refreshToken(): Promise<{ token: string }> {
    return apiClient.post(API_CONFIG.ENDPOINTS.REFRESH_TOKEN);
  },
};

// Menu API
export const menuApi = {
  async getMenuItems(category?: string): Promise<MenuItem[]> {
    const params = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiClient.get(`${API_CONFIG.ENDPOINTS.MENU_ITEMS}${params}`);
  },

  async getMenuItem(id: string): Promise<MenuItem> {
    return apiClient.get(API_CONFIG.ENDPOINTS.MENU_ITEM, { id });
  },

  async createMenuItem(menuItem: Omit<MenuItem, "id">): Promise<MenuItem> {
    return apiClient.post(API_CONFIG.ENDPOINTS.MENU_ITEMS, menuItem);
  },

  async updateMenuItem(
    id: string,
    updates: Partial<MenuItem>,
  ): Promise<MenuItem> {
    return apiClient.put(API_CONFIG.ENDPOINTS.MENU_ITEM, updates, { id });
  },

  async deleteMenuItem(id: string): Promise<void> {
    return apiClient.delete(API_CONFIG.ENDPOINTS.MENU_ITEM, { id });
  },

  async getCategories(): Promise<string[]> {
    return apiClient.get(API_CONFIG.ENDPOINTS.MENU_CATEGORIES);
  },
};

// Orders API
export const ordersApi = {
  async getOrders(customerId?: string): Promise<Order[]> {
    const params = customerId
      ? `?customerId=${encodeURIComponent(customerId)}`
      : "";
    return apiClient.get(`${API_CONFIG.ENDPOINTS.ORDERS}${params}`);
  },

  async getOrder(id: string): Promise<Order> {
    return apiClient.get(API_CONFIG.ENDPOINTS.ORDER, { id });
  },

  async createOrder(orderData: {
    customerId: string;
    customerName: string;
    items: OrderItem[];
    orderType: "dine-in" | "takeaway" | "delivery";
    tableNumber?: number;
    deliveryAddress?: string;
    specialInstructions?: string;
  }): Promise<Order> {
    return apiClient.post(API_CONFIG.ENDPOINTS.ORDERS, orderData);
  },

  async updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
    return apiClient.patch(
      API_CONFIG.ENDPOINTS.ORDER_STATUS,
      { status },
      { id },
    );
  },
};

// Reservations API
export const reservationsApi = {
  async getReservations(customerId?: string): Promise<Reservation[]> {
    const params = customerId
      ? `?customerId=${encodeURIComponent(customerId)}`
      : "";
    return apiClient.get(`${API_CONFIG.ENDPOINTS.RESERVATIONS}${params}`);
  },

  async createReservation(
    reservationData: Omit<Reservation, "id" | "createdAt" | "status">,
  ): Promise<Reservation> {
    return apiClient.post(API_CONFIG.ENDPOINTS.RESERVATIONS, reservationData);
  },

  async updateReservationStatus(
    id: string,
    status: Reservation["status"],
    tableNumber?: number,
  ): Promise<Reservation> {
    return apiClient.patch(
      API_CONFIG.ENDPOINTS.RESERVATION_STATUS,
      { status, tableNumber },
      { id },
    );
  },
};

// Analytics API
export const analyticsApi = {
  async getAnalytics(): Promise<AnalyticsData> {
    return apiClient.get(API_CONFIG.ENDPOINTS.ANALYTICS);
  },

  async getDashboard(): Promise<AnalyticsData> {
    return apiClient.get(API_CONFIG.ENDPOINTS.ANALYTICS_DASHBOARD);
  },
};

// User API
export const userApi = {
  async getProfile(): Promise<User> {
    return apiClient.get(API_CONFIG.ENDPOINTS.USER_PROFILE);
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    return apiClient.put(API_CONFIG.ENDPOINTS.USER_PROFILE, updates);
  },
};

// Cart utilities (localStorage-based - no backend needed)
export const cartApi = {
  getCart(): OrderItem[] {
    const cart = localStorage.getItem("savoria_cart");
    return cart ? JSON.parse(cart) : [];
  },

  addToCart(item: OrderItem): void {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      (cartItem) => cartItem.menuItemId === item.menuItemId,
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem("savoria_cart", JSON.stringify(cart));
  },

  updateCartItem(menuItemId: string, quantity: number): void {
    const cart = this.getCart();
    const index = cart.findIndex((item) => item.menuItemId === menuItemId);

    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
      localStorage.setItem("savoria_cart", JSON.stringify(cart));
    }
  },

  removeFromCart(menuItemId: string): void {
    const cart = this.getCart();
    const filteredCart = cart.filter((item) => item.menuItemId !== menuItemId);
    localStorage.setItem("savoria_cart", JSON.stringify(filteredCart));
  },

  clearCart(): void {
    localStorage.removeItem("savoria_cart");
  },

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
};
