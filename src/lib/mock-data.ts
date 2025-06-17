export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "staff" | "admin";
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  preparationTime: number; // in minutes
  calories?: number;
  rating: number;
  reviewsCount: number;
  available: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  total: number;
  orderType: "dine-in" | "takeaway" | "delivery";
  specialInstructions?: string;
  createdAt: string;
  estimatedTime?: number;
  tableNumber?: number;
  deliveryAddress?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialRequests?: string;
}

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  status: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
  specialRequests?: string;
  tableNumber?: number;
  createdAt: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueByMonth: { month: string; revenue: number }[];
  topMenuItems: { name: string; orders: number; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  customerRetention: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    phone: "+1234567890",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@savoria.com",
    role: "admin",
    phone: "+1234567891",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@savoria.com",
    role: "staff",
    phone: "+1234567892",
    createdAt: "2024-01-12T11:00:00Z",
  },
];

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Truffle Risotto",
    description:
      "Creamy arborio rice with black truffle, parmesan, and fresh herbs",
    price: 28.5,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500",
    ingredients: [
      "Arborio rice",
      "Black truffle",
      "Parmesan",
      "White wine",
      "Vegetable stock",
    ],
    allergens: ["Dairy"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: false,
    preparationTime: 25,
    calories: 450,
    rating: 4.8,
    reviewsCount: 124,
    available: true,
  },
  {
    id: "2",
    name: "Grilled Salmon",
    description: "Atlantic salmon with lemon butter sauce, seasonal vegetables",
    price: 32.0,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
    ingredients: [
      "Atlantic salmon",
      "Lemon",
      "Butter",
      "Asparagus",
      "Baby potatoes",
    ],
    allergens: ["Fish", "Dairy"],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: false,
    preparationTime: 20,
    calories: 520,
    rating: 4.9,
    reviewsCount: 89,
    available: true,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, house-made croutons, parmesan, classic caesar dressing",
    price: 16.0,
    category: "Appetizer",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Parmesan",
      "Anchovies",
      "Garlic",
    ],
    allergens: ["Dairy", "Gluten", "Fish"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isSpicy: false,
    preparationTime: 10,
    calories: 280,
    rating: 4.6,
    reviewsCount: 67,
    available: true,
  },
  {
    id: "4",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream",
    price: 12.0,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500",
    ingredients: [
      "Dark chocolate",
      "Butter",
      "Eggs",
      "Sugar",
      "Vanilla ice cream",
    ],
    allergens: ["Dairy", "Eggs", "Gluten"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isSpicy: false,
    preparationTime: 15,
    calories: 420,
    rating: 4.9,
    reviewsCount: 156,
    available: true,
  },
  {
    id: "5",
    name: "Craft Beer Selection",
    description: "Rotating selection of local craft beers",
    price: 8.0,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
    ingredients: ["Hops", "Malt", "Yeast", "Water"],
    allergens: ["Gluten"],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isSpicy: false,
    preparationTime: 2,
    rating: 4.4,
    reviewsCount: 43,
    available: true,
  },
  {
    id: "6",
    name: "Mediterranean Bowl",
    description: "Quinoa, hummus, olives, feta, cherry tomatoes, cucumber",
    price: 22.0,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    ingredients: [
      "Quinoa",
      "Hummus",
      "Olives",
      "Feta cheese",
      "Cherry tomatoes",
    ],
    allergens: ["Dairy"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: false,
    preparationTime: 12,
    calories: 380,
    rating: 4.7,
    reviewsCount: 92,
    available: true,
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "1",
    customerName: "John Doe",
    items: [
      { menuItemId: "1", name: "Truffle Risotto", price: 28.5, quantity: 1 },
      {
        menuItemId: "4",
        name: "Chocolate Lava Cake",
        price: 12.0,
        quantity: 1,
      },
    ],
    status: "preparing",
    total: 40.5,
    orderType: "dine-in",
    tableNumber: 12,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    estimatedTime: 20,
  },
  {
    id: "ORD-002",
    customerId: "1",
    customerName: "John Doe",
    items: [
      { menuItemId: "2", name: "Grilled Salmon", price: 32.0, quantity: 2 },
    ],
    status: "confirmed",
    total: 64.0,
    orderType: "takeaway",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedTime: 25,
  },
  {
    id: "ORD-003",
    customerId: "1",
    customerName: "John Doe",
    items: [
      { menuItemId: "3", name: "Caesar Salad", price: 16.0, quantity: 1 },
      { menuItemId: "6", name: "Mediterranean Bowl", price: 22.0, quantity: 1 },
    ],
    status: "ready",
    total: 38.0,
    orderType: "delivery",
    deliveryAddress: "123 Main St, City",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

// Mock Reservations
export const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    customerId: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1234567890",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "19:00",
    partySize: 4,
    status: "confirmed",
    tableNumber: 8,
    specialRequests: "Window table preferred",
    createdAt: new Date().toISOString(),
  },
  {
    id: "RES-002",
    customerId: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1234567890",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "18:30",
    partySize: 2,
    status: "pending",
    specialRequests: "Anniversary dinner",
    createdAt: new Date().toISOString(),
  },
];

// Mock Analytics
export const mockAnalytics: AnalyticsData = {
  totalRevenue: 45678.9,
  totalOrders: 234,
  totalCustomers: 156,
  averageOrderValue: 38.5,
  revenueByMonth: [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18678.9 },
  ],
  topMenuItems: [
    { name: "Truffle Risotto", orders: 45, revenue: 1282.5 },
    { name: "Grilled Salmon", orders: 38, revenue: 1216.0 },
    { name: "Mediterranean Bowl", orders: 32, revenue: 704.0 },
  ],
  ordersByStatus: [
    { status: "completed", count: 189 },
    { status: "preparing", count: 23 },
    { status: "confirmed", count: 15 },
    { status: "pending", count: 7 },
  ],
  customerRetention: 72.5,
};

export const menuCategories = [
  "All",
  "Appetizer",
  "Main Course",
  "Dessert",
  "Beverages",
];

export const orderStatuses = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "preparing",
    label: "Preparing",
    color: "bg-orange-100 text-orange-800",
  },
  { value: "ready", label: "Ready", color: "bg-green-100 text-green-800" },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-gray-100 text-gray-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];
