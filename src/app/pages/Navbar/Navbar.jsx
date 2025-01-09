"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  const { cartItems } = useCart();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(loggedInUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsScrolled(currentScrollY > 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style jsx global>{`
        .cart-badge {
          position: absolute;
          top: 15px;  
          left: 10px; 
          min-width: 18px; 
          height: 17px;
          padding: 0 4px; 
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          font-size: 11px; 
          font-weight: 500;
          transform-origin: center center;
        }

        .cart-badge-bounce {
          animation: bounce 0.5s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>

      <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg dark:shadow-white/10"
            : "bg-white dark:bg-black"
        }
        ${!isScrollingUp ? "-translate-y-full" : "translate-y-0"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter transition-transform hover:scale-105"
            >
              <span className="text-black dark:text-white">ApparellGlow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link-underline text-sm font-medium transition-all duration-300
                  ${
                    pathname === href
                      ? "text-black dark:text-white active"
                      : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }
                `}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-white transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 text-black transition-transform hover:-rotate-45" />
                )}
              </button>

              <div
                className="relative"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
              >
                <Link
                  href="/cart"
                  className="relative p-2 rounded-full transition-all duration-300 dark:hover:bg-gray-800"
                >
                  <ShoppingCart className="w-5 h-5 text-black dark:text-white" />
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="cart-badge bg-blue-600 text-white"
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </Link>
              </div>

              {user ? (
                <div className="relative group">
                  <button
                    onClick={handleSignOut}
                    className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full"
                  >
                    {user.name.slice(0, 2).toUpperCase()}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Sign In
                  </Link>
                </>
              )}

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-black dark:text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-black dark:text-white" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="md:hidden bg-white dark:bg-black shadow-md"
              >
                <ul className="space-y-2 py-4 px-6">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-sm font-medium transition-all duration-300
                        ${
                          pathname === href
                            ? "text-black dark:text-white"
                            : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        }
                      `}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Navbar;
