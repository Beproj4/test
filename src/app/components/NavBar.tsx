import Link from 'next/link';
import { Mode } from './Mode';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <Mode/>
      <ul className="flex space-x-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/register">Create Account</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
