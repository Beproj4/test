'use client';

import { useEffect, useState } from 'react';

export default function MySubmissionsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/reviews/my-submissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Submissions</h1>
      <ul className="space-y-4">
        {reviews.map((review: any) => (
          <li key={review._id} className="border p-4">
            <h3 className="text-lg font-semibold">Product: {review.product.name}</h3>
            <p>Status: <span className={review.status === 'approved' ? 'text-green-500' : review.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>{review.status}</span></p>
            <p>Changes Requested:</p>
            <ul className="list-disc pl-5">
              {Object.entries(review.changes).map(([field, value]) => (
                <li key={field}>{field}: {value}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
