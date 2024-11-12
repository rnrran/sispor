import localFont from "next/font/local";
import "./globals.css";
import Header from './components/Header'

export default function RootLayout({
  children,
}){
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
