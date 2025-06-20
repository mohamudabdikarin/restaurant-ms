import { RequireAuth } from "@/hooks/use-auth";

export default function AdminDashboard() {
  return (
    <RequireAuth roles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, Admin. Here you can manage menu items, view all orders and reservations, and see site analytics. This feature is under construction.
        </p>
        {/* TODO: Add components for managing menu, orders, reservations, and viewing analytics */}
      </div>
    </RequireAuth>
  );
}