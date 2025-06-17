import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Landing from "@/pages/Landing";
import Menu from "@/pages/Menu";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";

const ReservationsPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Reservations</h1>
    <p className="text-muted-foreground">Reservations page coming soon...</p>
  </div>
);

const CartPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Cart</h1>
    <p className="text-muted-foreground">Cart page coming soon...</p>
  </div>
);

const ProfilePage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Profile</h1>
    <p className="text-muted-foreground">Profile page coming soon...</p>
  </div>
);

const AdminDashboard = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
    <p className="text-muted-foreground">Admin dashboard coming soon...</p>
  </div>
);

const StaffDashboard = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
    <p className="text-muted-foreground">Staff dashboard coming soon...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/staff/*" element={<StaffDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Toaster
              richColors
              position="top-right"
              toastOptions={{
                duration: 4000,
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
