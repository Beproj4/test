'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/user-role', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRole(data.role);
      } else {
        router.push('/login');
      }
    };

    fetchUserRole();
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {role && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ul className="space-y-4">
            {products.map((product: any) => (
              <li
                key={product._id}
                className="border p-4 cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-sm text-gray-600">${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
