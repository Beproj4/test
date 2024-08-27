'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: { product_id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
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
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${params.product_id}`);
      const data = await res.json();
      setProduct(data);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
      });
    };

    fetchProduct();
  }, [params.product_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = role === 'admin' ? `/api/products/${params.product_id}` : `/api/reviews`;
    const method = role === 'admin' ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Failed to save changes');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {product && (
        <>
          <h1 className="text-3xl font-bold mb-6 bg-red-600">{product.name}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full"
                required
                disabled={role !== 'admin'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full"
                required
                disabled={role !== 'admin'}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 w-full"
                required
                disabled={role !== 'admin'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {role === 'admin' ? 'Update Product' : 'Submit Changes'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
