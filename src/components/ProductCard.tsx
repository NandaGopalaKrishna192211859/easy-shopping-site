
import React from "react";
import { Product } from "@/utils/productData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-shop-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            onClick={handleAddToCart} 
            size="sm" 
            className="bg-shop-primary hover:bg-shop-accent text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
