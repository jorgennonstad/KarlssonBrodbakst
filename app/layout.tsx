import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "./components/Providers";
import Navbar from "./components/NavBar/Navbar";
import ShoppingCartModal from "./components/ShoppingCartModal/ShoppingCartModal";

// Add a boolean to toggle coming soon status
const showComingSoon = false;  // Change this to `false` to show the normal content

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karlson Brødbakst",
  description: "Nystekt brød rett ut av ovnen levert på døra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (showComingSoon) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="bg-white pd-6 sm:pd-8 lg:pd-12 text-center">
            <h1 className="text-4xl font-bold">Nettsiden kommer snart</h1>
            <p className="mt-4 text-lg">Karlson Brødbakst lanseres snart!</p>
          </div>
        </body>
      </html>
    );
  }

  // Otherwise, render the site normally
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <ShoppingCartModal />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
