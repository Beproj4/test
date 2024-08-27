'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Show, setShow] = useState(false);
  const [role, setRole] = useState('team_member');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });
    
    if (res.ok) {
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-4 text-black"
          required
        />
        <div className='flex gap-x-2 mb-2 items-center justify-center'>
        <input
          type={Show ? "text":"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full text-black"
          required
        />
        <div className=' bg-blue-500 text-sm text-center cursor-pointer'
        onClick={()=>setShow(prev => !prev)}
        >{Show ? "Hide" : "Show"} Password</div>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="team_member"
              checked={role === 'team_member'}
              onChange={(e) => setRole(e.target.value)}
            />
            Team Member
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
