'use client';

import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from '@/app/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  
  const { cartItems } = useCart();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setIsDarkMode(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
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
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  const CartPreview = () => {
    if (cartItems.length === 0) return null;
    
    return (
      <AnimatePresence>
        {isCartHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            style={{ top: '100%' }}
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Cart Items ({cartItems.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-auto">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.image && (
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        CAF {item.price}
                      </p>
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-2">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Link href="/cart">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium
                            hover:bg-blue-700 transition-colors"
                  >
                    View Cart
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <style jsx global>{`
        .cart-badge {
          position: absolute;
          top: 15px;  /* Adjusted from -top-1 */
          left: 10px; /* Adjusted from -right-1 */
          min-width: 18px; /* Ensure consistent width */
          height: 17px; /* Slightly smaller height */
          padding: 0 4px; /* Add some padding for double digits */
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          font-size: 11px; /* Slightly smaller font */
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
          ${isScrolled 
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg dark:shadow-white/10' 
            : 'bg-white dark:bg-black'}
          ${!isScrollingUp ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-tighter transition-transform hover:scale-105"
            >
              <span className="text-black dark:text-white">ApparellGlow</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link-underline text-sm font-medium transition-all duration-300
                    ${pathname === href 
                      ? 'text-black dark:text-white active' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
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
                  <AnimatePresence>
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
                  </AnimatePresence>
                </Link>
                <CartPreview />
              </div>

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg transition-all duration-300  "
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

          {isMenuOpen && (
            <div className="md:hidden menu-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300
                      ${pathname === href 
                        ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                      }
                    `}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;