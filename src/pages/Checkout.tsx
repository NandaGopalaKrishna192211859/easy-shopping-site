
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  zip?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = "ZIP code is invalid";
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Use MM/YY format";
    }
    
    if (!formData.cardCvc.trim()) {
      newErrors.cardCvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = "CVC must be 3 or 4 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate processing
      setTimeout(() => {
        clearCart();
        toast.success("Order placed successfully! Thank you for your purchase.");
        navigate("/");
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6">
        <Link to="/" className="text-shop-primary hover:underline flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Shopping
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={errors.zip ? "border-red-500" : ""}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? "border-red-500" : ""}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Expiry Date (MM/YY)</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className={errors.cardExpiry ? "border-red-500" : ""}
                    />
                    {errors.cardExpiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className={errors.cardCvc ? "border-red-500" : ""}
                    />
                    {errors.cardCvc && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 lg:hidden">
              <OrderSummary cart={cart} total={getCartTotal()} />
              <Button
                type="submit"
                className="w-full mt-4 bg-shop-primary hover:bg-shop-accent"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Place Order • $${getCartTotal().toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <OrderSummary cart={cart} total={getCartTotal()} />
            <Button
              onClick={handleSubmit}
              className="w-full mt-4 bg-shop-primary hover:bg-shop-accent"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  cart: Array<any>;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      {cart.length === 0 ? (
        <p className="text-gray-500 py-4">Your cart is empty</p>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div className="flex">
                  <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden mr-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate max-w-[150px]">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
