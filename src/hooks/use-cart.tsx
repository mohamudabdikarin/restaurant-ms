import React, { createContext, useContext, useEffect, useState } from "react";
import { OrderItem } from "@/lib/mock-data";
import { cartApi } from "@/lib/api";

interface CartContextType {
  items: OrderItem[];
  itemsCount: number;
  total: number;
  addItem: (item: OrderItem) => void;
  updateItem: (menuItemId: string, quantity: number) => void;
  removeItem: (menuItemId: string) => void;
  clearCart: () => void;
  isInCart: (menuItemId: string) => boolean;
  getItemQuantity: (menuItemId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(cartApi.getCart());
  }, []);

  // Update localStorage whenever items change
  useEffect(() => {
    if (items.length > 0 || cartApi.getCart().length > 0) {
      // Only update localStorage if there's a meaningful change
      const currentCart = cartApi.getCart();
      if (JSON.stringify(currentCart) !== JSON.stringify(items)) {
        localStorage.setItem("savoria_cart", JSON.stringify(items));
      }
    }
  }, [items]);

  const addItem = (item: OrderItem) => {
    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (cartItem) => cartItem.menuItemId === item.menuItemId,
      );

      if (existingIndex >= 0) {
        const newItems = [...currentItems];
        newItems[existingIndex].quantity += item.quantity;
        return newItems;
      } else {
        return [...currentItems, item];
      }
    });
  };

  const updateItem = (menuItemId: string, quantity: number) => {
    setItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((item) => item.menuItemId !== menuItemId);
      }

      return currentItems.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item,
      );
    });
  };

  const removeItem = (menuItemId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.menuItemId !== menuItemId),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("savoria_cart");
  };

  const isInCart = (menuItemId: string) => {
    return items.some((item) => item.menuItemId === menuItemId);
  };

  const getItemQuantity = (menuItemId: string) => {
    const item = items.find((item) => item.menuItemId === menuItemId);
    return item ? item.quantity : 0;
  };

  const itemsCount = items.reduce((count, item) => count + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = {
    items,
    itemsCount,
    total,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
