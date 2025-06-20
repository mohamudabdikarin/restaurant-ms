// src/pages/Profile.tsx
import React, { useState, useEffect } from "react";
import { useAuth, RequireAuth } from "@/hooks/use-auth";
import { ordersApi, reservationsApi } from "@/lib/api";
import { Order, Reservation } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, ShoppingBag, Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHistory = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getOrders(userId).then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      {orders.length === 0 ? <p>No past orders found.</p> :
        orders.map(order => (
          <Card key={order.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Order {order.id}</p>
                <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <Badge>{order.status}</Badge>
                <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
}

const ReservationHistory = ({ userId }: { userId: string }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reservationsApi.getReservations(userId).then(data => {
      setReservations(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      {reservations.length === 0 ? <p>No past reservations found.</p> :
        reservations.map(res => (
          <Card key={res.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Reservation for {res.partySize}</p>
                <p className="text-sm text-muted-foreground">{new Date(res.date).toLocaleDateString()} at {res.time}</p>
              </div>
              <Badge>{res.status}</Badge>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <CardTitle className="flex items-center gap-3 font-display text-4xl">
                    <User className="h-8 w-8" />
                    {user?.name}
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-2"/>Order History</TabsTrigger>
                <TabsTrigger value="reservations"><Calendar className="h-4 w-4 mr-2"/>Reservation History</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="pt-4">
                {user && <OrderHistory userId={user.id} />}
              </TabsContent>
              <TabsContent value="reservations" className="pt-4">
                {user && <ReservationHistory userId={user.id} />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </RequireAuth>
  );
}