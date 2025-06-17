import {
  mockUsers,
  mockMenuItems,
  mockOrders,
  mockReservations,
  mockAnalytics,
  User,
  MenuItem,
  Order,
  Reservation,
  AnalyticsData,
  OrderItem,
} from "./mock-data";

// Simulate network delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEYS = {
  MENU_ITEMS: "savoria_menu_items",
  ORDERS: "savoria_orders",
  RESERVATIONS: "savoria_reservations",
  CART: "savoria_cart",
} as const;

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    localStorage.setItem(
      STORAGE_KEYS.MENU_ITEMS,
      JSON.stringify(mockMenuItems),
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
    localStorage.setItem(
      STORAGE_KEYS.RESERVATIONS,
      JSON.stringify(mockReservations),
    );
  }
};

// Initialize storage on module load
initializeStorage();

// Auth API
export const authApi = {
  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    await delay();

    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Simulate JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    return { user, token };
  },

  async register(
    userData: Omit<User, "id" | "createdAt">,
  ): Promise<{ user: User; token: string }> {
    await delay();

    const user: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    return { user, token };
  },

  async validateToken(token: string): Promise<User> {
    await delay(200);

    // Extract user ID from mock token
    const userId = token.split("-")[3];
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      throw new Error("Invalid token");
    }

    return user;
  },
};

// Menu API
export const menuApi = {
  async getMenuItems(category?: string): Promise<MenuItem[]> {
    await delay();

    const items = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MENU_ITEMS) || "[]",
    );

    if (category && category !== "All") {
      return items.filter((item: MenuItem) => item.category === category);
    }

    return items;
  },

  async getMenuItem(id: string): Promise<MenuItem> {
    await delay();

    const items = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MENU_ITEMS) || "[]",
    );
    const item = items.find((item: MenuItem) => item.id === id);

    if (!item) {
      throw new Error("Menu item not found");
    }

    return item;
  },

  async createMenuItem(menuItem: Omit<MenuItem, "id">): Promise<MenuItem> {
    await delay();

    const newItem: MenuItem = {
      ...menuItem,
      id: `item_${Date.now()}`,
    };

    const items = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MENU_ITEMS) || "[]",
    );
    items.push(newItem);
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));

    return newItem;
  },

  async updateMenuItem(
    id: string,
    updates: Partial<MenuItem>,
  ): Promise<MenuItem> {
    await delay();

    const items = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MENU_ITEMS) || "[]",
    );
    const index = items.findIndex((item: MenuItem) => item.id === id);

    if (index === -1) {
      throw new Error("Menu item not found");
    }

    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));

    return items[index];
  },

  async deleteMenuItem(id: string): Promise<void> {
    await delay();

    const items = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MENU_ITEMS) || "[]",
    );
    const filteredItems = items.filter((item: MenuItem) => item.id !== id);
    localStorage.setItem(
      STORAGE_KEYS.MENU_ITEMS,
      JSON.stringify(filteredItems),
    );
  },
};

// Orders API
export const ordersApi = {
  async getOrders(customerId?: string): Promise<Order[]> {
    await delay();

    const orders = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]",
    );

    if (customerId) {
      return orders.filter((order: Order) => order.customerId === customerId);
    }

    return orders;
  },

  async getOrder(id: string): Promise<Order> {
    await delay();

    const orders = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]",
    );
    const order = orders.find((order: Order) => order.id === id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
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
    await delay();

    const total = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder: Order = {
      id: `ORD-${String(Date.now()).slice(-6)}`,
      ...orderData,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
      estimatedTime: 25, // Default estimation
    };

    const orders = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]",
    );
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    return newOrder;
  },

  async updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
    await delay();

    const orders = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]",
    );
    const index = orders.findIndex((order: Order) => order.id === id);

    if (index === -1) {
      throw new Error("Order not found");
    }

    orders[index].status = status;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    return orders[index];
  },
};

// Reservations API
export const reservationsApi = {
  async getReservations(customerId?: string): Promise<Reservation[]> {
    await delay();

    const reservations = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.RESERVATIONS) || "[]",
    );

    if (customerId) {
      return reservations.filter(
        (res: Reservation) => res.customerId === customerId,
      );
    }

    return reservations;
  },

  async createReservation(
    reservationData: Omit<Reservation, "id" | "createdAt" | "status">,
  ): Promise<Reservation> {
    await delay();

    const newReservation: Reservation = {
      ...reservationData,
      id: `RES-${String(Date.now()).slice(-6)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const reservations = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.RESERVATIONS) || "[]",
    );
    reservations.push(newReservation);
    localStorage.setItem(
      STORAGE_KEYS.RESERVATIONS,
      JSON.stringify(reservations),
    );

    return newReservation;
  },

  async updateReservationStatus(
    id: string,
    status: Reservation["status"],
    tableNumber?: number,
  ): Promise<Reservation> {
    await delay();

    const reservations = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.RESERVATIONS) || "[]",
    );
    const index = reservations.findIndex((res: Reservation) => res.id === id);

    if (index === -1) {
      throw new Error("Reservation not found");
    }

    reservations[index].status = status;
    if (tableNumber) {
      reservations[index].tableNumber = tableNumber;
    }

    localStorage.setItem(
      STORAGE_KEYS.RESERVATIONS,
      JSON.stringify(reservations),
    );

    return reservations[index];
  },
};

// Analytics API
export const analyticsApi = {
  async getAnalytics(): Promise<AnalyticsData> {
    await delay();

    // In a real app, this would calculate from actual data
    return mockAnalytics;
  },
};

// Cart utilities (localStorage-based)
export const cartApi = {
  getCart(): OrderItem[] {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
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

    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
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
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  },

  removeFromCart(menuItemId: string): void {
    const cart = this.getCart();
    const filteredCart = cart.filter((item) => item.menuItemId !== menuItemId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(filteredCart));
  },

  clearCart(): void {
    localStorage.removeItem(STORAGE_KEYS.CART);
  },

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
};
