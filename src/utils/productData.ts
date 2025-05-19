
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    category: "clothing",
    description: "A comfortable and versatile classic white t-shirt made from 100% organic cotton. Perfect for everyday wear and easy to style with any outfit.",
    rating: 4.5
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1604176424472-9ce0a0d89fca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGplYW5zfGVufDB8fDB8fHww",
    category: "clothing",
    description: "Modern slim fit jeans with a slight stretch for comfort. Features a classic five-pocket design and a versatile dark wash.",
    rating: 4.2
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design for immersive sound.",
    rating: 4.7
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    category: "electronics",
    description: "Advanced smartwatch with health monitoring, GPS, water resistance, and customizable watch faces. Compatible with iOS and Android.",
    rating: 4.4
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
    category: "accessories",
    description: "Genuine leather wallet with multiple card slots, bill compartment, and RFID blocking technology for secure everyday use.",
    rating: 4.3
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    category: "footwear",
    description: "Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole for optimal performance.",
    rating: 4.6
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1585687433790-6718c9463f9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZmZlZSUyMG1ha2VyfGVufDB8fDB8fHww",
    category: "home",
    description: "Programmable coffee maker with 12-cup capacity, built-in grinder, and adjustable brew strength for your perfect morning cup.",
    rating: 4.1
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1534189283006-b4999087e6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D",
    category: "home",
    description: "Adjustable desk lamp with multiple lighting modes, USB charging port, and modern design perfect for work or study spaces.",
    rating: 4.0
  }
];

export const categories = [...new Set(products.map(product => product.category))];
