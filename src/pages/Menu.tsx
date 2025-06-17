import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { menuApi } from "@/lib/api";
import { MenuItem, menuCategories } from "@/lib/mock-data";
import {
  Search,
  Filter,
  Plus,
  Minus,
  Star,
  Clock,
  Leaf,
  Flame,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const { addItem, getItemQuantity, updateItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    loadMenuItems();
  }, [selectedCategory]);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await menuApi.getMenuItems(
        selectedCategory === "All" ? undefined : selectedCategory,
      );
      setMenuItems(items);
    } catch (error) {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedItems = menuItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "time":
          return a.preparationTime - b.preparationTime;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    if (!user || user.role !== "customer") {
      toast.error("Please log in as a customer to add items to cart");
      return;
    }

    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
    });

    toast.success(`Added ${item.name} to cart`);
  };

  const handleQuantityChange = (item: MenuItem, newQuantity: number) => {
    if (!user || user.role !== "customer") return;

    if (newQuantity === 0) {
      updateItem(item.id, 0);
      toast.success(`Removed ${item.name} from cart`);
    } else {
      updateItem(item.id, newQuantity);
    }
  };

  const MenuItemCard = ({ item }: { item: MenuItem }) => {
    const currentQuantity = getItemQuantity(item.id);
    const isCustomer = user?.role === "customer";

    return (
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!item.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-white bg-black/70">
                Unavailable
              </Badge>
            </div>
          )}
          <div className="absolute top-2 left-2 flex gap-1">
            {item.isVegetarian && (
              <Badge className="bg-green-500 hover:bg-green-600">
                <Leaf className="h-3 w-3 mr-1" />
                Veg
              </Badge>
            )}
            {item.isSpicy && (
              <Badge className="bg-red-500 hover:bg-red-600">
                <Flame className="h-3 w-3 mr-1" />
                Spicy
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold mb-1">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{item.rating}</span>
                  <span className="ml-1">({item.reviewsCount})</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{item.preparationTime} min</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge
                variant="secondary"
                className="text-lg font-semibold text-savoria-600 bg-savoria-50"
              >
                ${item.price.toFixed(2)}
              </Badge>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedItem(item)}
                >
                  View Details
                </Button>
              </DialogTrigger>
            </Dialog>

            {isCustomer && item.available && (
              <div className="flex items-center gap-2">
                {currentQuantity > 0 ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleQuantityChange(item, currentQuantity - 1)
                      }
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {currentQuantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleQuantityChange(item, currentQuantity + 1)
                      }
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="savoria-gradient"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const ItemDetailsDialog = () => (
    <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
      <DialogContent className="max-w-2xl">
        {selectedItem && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                {selectedItem.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedItem.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full aspect-video object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-savoria-600">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedItem.rating}</span>
                    <span className="text-muted-foreground">
                      ({selectedItem.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedItem.isVegetarian && (
                    <Badge className="bg-green-500">
                      <Leaf className="h-3 w-3 mr-1" />
                      Vegetarian
                    </Badge>
                  )}
                  {selectedItem.isVegan && (
                    <Badge className="bg-green-600">Vegan</Badge>
                  )}
                  {selectedItem.isGlutenFree && (
                    <Badge className="bg-blue-500">Gluten Free</Badge>
                  )}
                  {selectedItem.isSpicy && (
                    <Badge className="bg-red-500">
                      <Flame className="h-3 w-3 mr-1" />
                      Spicy
                    </Badge>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.ingredients.join(", ")}
                  </p>
                </div>

                {selectedItem.allergens.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Allergens</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.allergens.join(", ")}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedItem.preparationTime} min</span>
                  </div>
                  {selectedItem.calories && (
                    <span>{selectedItem.calories} cal</span>
                  )}
                </div>

                {user?.role === "customer" && selectedItem.available && (
                  <Button
                    className="w-full savoria-gradient"
                    onClick={() => handleAddToCart(selectedItem)}
                  >
                    Add to Cart - ${selectedItem.price.toFixed(2)}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-savoria-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Our Menu
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, each crafted
            with passion and the finest ingredients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {menuCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="time">Preparation Time</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "isVegetarian", label: "Vegetarian" },
                  { key: "isVegan", label: "Vegan" },
                  { key: "isGlutenFree", label: "Gluten Free" },
                  { key: "isSpicy", label: "Spicy" },
                ].map((filter) => (
                  <label
                    key={filter.key}
                    className="flex items-center space-x-2"
                  >
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{filter.label}</span>
                  </label>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {loading
              ? "Loading..."
              : `${filteredAndSortedItems.length} dishes found`}
          </p>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No dishes found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <ItemDetailsDialog />
    </div>
  );
}
