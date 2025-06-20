// src/pages/Reservations.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { reservationsApi } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, Users, Loader2 } from "lucide-react";
import Landing from "@/pages/Landing";
import Menu from "@/pages/Menu";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";
// import ReservationsPage from "@/pages/Reservations"; // New
import CartPage from "@/pages/Cart"; // New
import ProfilePage from "@/pages/Profile"; // New
import AdminDashboard from "@/pages/admin/Dashboard"; // New
import StaffDashboard from "@/pages/staff/Dashboard"; // New
export default function ReservationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("2");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to make a reservation.");
      navigate("/login");
      return;
    }
    if (!date || !time) {
      toast.error("Please select a date and time.");
      return;
    }
    setIsLoading(true);
    try {
      await reservationsApi.createReservation({
        customerId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || "",
        date: date.toISOString().split("T")[0],
        time,
        partySize: parseInt(partySize, 10),
        specialRequests,
      });
      toast.success("Reservation request sent! We will confirm shortly.");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to make reservation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-4xl">Book a Table</CardTitle>
          <CardDescription>We look forward to hosting you at Savoria.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label><CalendarIcon className="inline-block h-4 w-4 mr-2" />Select Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                   <Label htmlFor="time"><Clock className="inline-block h-4 w-4 mr-2" />Select Time</Label>
                   <Select value={time} onValueChange={setTime}>
                     <SelectTrigger id="time">
                       <SelectValue placeholder="Select a time slot" />
                     </SelectTrigger>
                     <SelectContent>
                       {availableTimes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                     </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="party-size"><Users className="inline-block h-4 w-4 mr-2" />Party Size</Label>
                  <Select value={partySize} onValueChange={setPartySize}>
                    <SelectTrigger id="party-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(8)].map((_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          {i + 1} guest{i > 0 && 's'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="special-requests">Special Requests</Label>
              <Input
                id="special-requests"
                placeholder="e.g., window seat, dietary restrictions"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full savoria-gradient" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Request...
                </>
              ) : (
                "Request Reservation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}