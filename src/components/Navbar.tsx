
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onCartClick }) => {
  const { getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-shop-primary">
          ShopEasy
        </Link>

        <div className="relative w-full max-w-md mx-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onCartClick}
            variant="outline"
            className="relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-shop-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
