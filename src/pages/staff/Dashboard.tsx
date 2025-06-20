import { RequireAuth } from "@/hooks/use-auth";

export default function StaffDashboard() {
  return (
    <RequireAuth roles={['staff', 'admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome. Here you can view incoming orders and manage table reservations. This feature is under construction.
        </p>
        {/* TODO: Add components for managing orders (updating status) and reservations */}
      </div>
    </RequireAuth>
  );
}