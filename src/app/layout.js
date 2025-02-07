import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./pages/Navbar/Navbar";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Apparellglow",
  description: "Your Fashion Destination",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                {children}
              </WishlistProvider>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
