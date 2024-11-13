// components/Navbar.jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h1>Sigma</h1>
      </div>
      <div className="menu">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/my-notes">My Notes</Link>
        <Link href="/add-notes">Add Notes</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </nav>
  );
}
