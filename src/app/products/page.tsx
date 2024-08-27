// src/app/products/page.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/get-products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, []);
  if(!products){
    return <h1 className="text-white">No Products addit</h1>
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
              unoptimized
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-black">{product.name}</h2>
              <p className="text-gray-700 mt-2 truncate">{product.description}</p>
              <p className="text-gray-900 font-bold mt-4">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
