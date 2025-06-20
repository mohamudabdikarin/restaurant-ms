// src/pages/Cart.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ordersApi } from "@/lib/api";

export default function CartPage() {
  const { items, itemsCount, total, updateItem, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }

    try {
      await ordersApi.createOrder({
        customerId: user.id,
        customerName: user.name,
        items: items,
        orderType: 'takeaway', // Defaulting to takeaway for simplicity
      });
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/profile');
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-display text-4xl">
            <ShoppingCart className="h-8 w-8" />
            Your Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          {itemsCount === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">Your cart is empty.</p>
              <Button asChild>
                <Link to="/menu">Explore Our Menu</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.menuItemId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateItem(item.menuItemId, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateItem(item.menuItemId, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="w-20 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button size="icon" variant="ghost" className="text-red-500" onClick={() => removeItem(item.menuItemId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {itemsCount > 0 && (
          <CardFooter className="flex flex-col items-end space-y-4 pt-6">
             <div className="text-2xl font-bold">
               <span>Total: </span>
               <span className="text-savoria-600">${total.toFixed(2)}</span>
             </div>
             <p className="text-sm text-muted-foreground">Shipping & taxes calculated at checkout.</p>
             <div className="flex gap-4">
              <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              <Button className="savoria-gradient" onClick={handleCheckout}>Proceed to Checkout</Button>
             </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}