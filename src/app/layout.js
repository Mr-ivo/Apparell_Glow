import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./pages/Navbar/Navbar";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Glow Cosmetics",
  description: "Your beauty destination",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </LanguageProvider>
        </body>
      </html>
    </>
  );
}
