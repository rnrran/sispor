// pages/index.tsx
import Navbar from "../components/Navbar"; // Impor Navbar
import Hero from "../components/Hero"; // Impor Hero
import "./home.scss"; // Impor SCSS untuk styling

export default function Home() {
  return (
    <div>
      <Navbar /> {/* Menampilkan Navbar */}
      <Hero /> {/* Menampilkan Hero */}
    </div>
  );
}
