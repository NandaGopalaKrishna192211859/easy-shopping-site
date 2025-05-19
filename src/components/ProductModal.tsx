
import React from "react";
import { Product } from "@/utils/productData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Star, Minus, Plus, X } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    // Reset quantity when a different product is selected
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="absolute right-4 top-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="bg-gray-100 rounded-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
              </div>
              
              <p className="text-2xl font-bold text-shop-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="flex items-center space-x-2 mb-6">
                <p className="font-medium text-gray-900">Category:</p>
                <span className="bg-shop-secondary text-shop-dark px-3 py-1 rounded-full text-sm capitalize">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center space-x-4 mb-4">
                <p className="font-medium">Quantity:</p>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decrementQuantity} 
                    disabled={quantity <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-10 text-center">{quantity}</span>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={incrementQuantity}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full bg-shop-primary hover:bg-shop-accent"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
