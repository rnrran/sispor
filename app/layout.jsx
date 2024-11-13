'use client'
import localFont from "next/font/local";
import "./globals.css";
import Header from './components/Header'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children
}){

  const path = usePathname()
  const red = useRouter()
  // buat redirect kalo udah login ga bisa akses page tertentu
  const isAuthenticated = false
  if (isAuthenticated && (path === '/login' || path === '/daftar')) {
    red.push('/')
  }

  return (
    <html lang="en">
      <head>
        <title>Sisfor</title>
      </head>
      <body>
        <Header/>
        
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
