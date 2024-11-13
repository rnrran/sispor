// homepage/page.jsx
import "./home.scss"; // Impor SCSS untuk styling halaman
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Navbar /> {/* Menampilkan Navbar */}
      <Hero /> {/* Menampilkan Hero */}
    </div>
  );
}
