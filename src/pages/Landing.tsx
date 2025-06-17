import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Clock,
  MapPin,
  Star,
  Users,
  Calendar,
  ShoppingBag,
  Award,
  Heart,
  Phone,
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: ChefHat,
      title: "Gourmet Cuisine",
      description:
        "Experience exceptional flavors crafted by our award-winning chefs using the finest ingredients.",
    },
    {
      icon: Users,
      title: "Perfect Ambiance",
      description:
        "Elegant dining atmosphere perfect for romantic dinners, business meetings, or family celebrations.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized for culinary excellence and outstanding service by prestigious dining publications.",
    },
    {
      icon: Heart,
      title: "Memorable Experiences",
      description:
        "Creating unforgettable moments through exceptional food, service, and attention to detail.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Absolutely incredible dining experience! The truffle risotto was divine and the service was impeccable.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Perfect spot for our anniversary dinner. The atmosphere was romantic and the food exceeded our expectations.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment:
        "The salmon was cooked to perfection and the dessert was a work of art. Will definitely be back!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-warm-900 via-warm-800 to-warm-900 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&h=1080&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-savoria-400 to-orange-400 bg-clip-text text-transparent">
              Savoria
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Where culinary artistry meets exceptional service. Experience fine
            dining that creates lasting memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              asChild
              className="savoria-gradient text-lg px-8 py-6"
            >
              <Link to="/menu">Explore Menu</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-warm-900"
            >
              <Link to="/reservations">Make Reservation</Link>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-savoria-400" />
              <span>Open 5:00 PM - 11:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-savoria-400" />
              <span>Downtown Culinary District</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-savoria-400" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Savoria</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes our restaurant a destination for food lovers
              and connoisseurs alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-savoria-500 to-orange-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Signature <span className="text-gradient">Dishes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A taste of our most beloved creations, crafted with passion and
              premium ingredients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Truffle Risotto",
                description:
                  "Creamy arborio rice with black truffle and parmesan",
                price: "$28",
                image:
                  "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop",
              },
              {
                name: "Grilled Salmon",
                description:
                  "Atlantic salmon with lemon butter and seasonal vegetables",
                price: "$32",
                image:
                  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=400&fit=crop",
              },
              {
                name: "Chocolate Lava Cake",
                description:
                  "Warm chocolate cake with molten center and vanilla ice cream",
                price: "$12",
                image:
                  "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop",
              },
            ].map((dish, index) => (
              <Card
                key={index}
                className="overflow-hidden group cursor-pointer menu-card-hover"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-xl font-semibold">
                      {dish.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-savoria-600 bg-savoria-50"
                    >
                      {dish.price}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="savoria-gradient">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-gradient">Guests Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our valued guests
              have to say about their Savoria experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-savoria-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join us for an evening of exceptional cuisine, impeccable service,
            and memories that will last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white text-savoria-600 hover:bg-gray-100 border-white"
            >
              <Link to="/reservations" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book a Table
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white text-savoria-600 hover:bg-gray-100 border-white"
            >
              <Link to="/menu" className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Online
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
