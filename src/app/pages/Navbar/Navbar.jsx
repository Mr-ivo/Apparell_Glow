"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Sun, Moon, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from 'js-cookie';

const Navbar = () => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  const { cartItems } = useCart();
  const { language, changeLanguage } = useLanguage();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const trans = await import(`@/app/translations/${language}.json`);
        setTranslations(trans);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, [language]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(loggedInUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    Cookies.remove('user');
    setUser(null);
    window.location.href = '/'; 
  };

  const getUserInitials = (user) => {
    if (!user) return '';
    
    if (user.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    
    if (user.email) {
      const emailUsername = user.email.split('@')[0];
      return emailUsername.slice(0, 2).toUpperCase();
    }
    
    return '';
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
    { href: "/", label: translations?.navbar?.home || "Home" },
    { href: "/about", label: translations?.navbar?.about || "About" },
    { href: "/shop", label: translations?.navbar?.shop || "Shop" },
    { href: "/contact", label: translations?.navbar?.contact || "Contact" },
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
              className="transition-transform hover:scale-105 flex items-center"
            >
              <Image
                src="/logo.svg"
                alt="Apparellglow Logo"
                width={150}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

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
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <div className="relative group">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 text-gray-800 dark:text-gray-200"
                  aria-label="Change language"
                >
                  <Globe size={24} />
                  <span className="text-sm font-medium uppercase">{language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('fr')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                  >
                    Français
                  </button>
                </div>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
              >
                <Link
                  href="/cart"
                  className="relative p-2 rounded-full transition-colors text-gray-800 dark:text-gray-200"
                >
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className={`cart-badge bg-blue-600 text-white ${isCartHovered ? 'cart-badge-bounce' : ''}`}>
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    {getUserInitials(user)}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {translations?.navbar?.signOut || "Sign Out"}
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {translations?.navbar?.signIn || "Sign In"}
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {translations?.navbar?.signUp || "Sign Up"}
                  </Link>
                </div>
              )}

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg transition-all duration-300 text-gray-800 dark:text-gray-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
                className="md:hidden bg-white dark:bg-gray-800 shadow-md"
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
                  {!user && (
                    <>
                      <li>
                        <Link
                          href="/signin"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300"
                        >
                          {translations?.navbar?.signIn || "Sign In"}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300"
                        >
                          {translations?.navbar?.signUp || "Sign Up"}
                        </Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <li>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300"
                      >
                        {translations?.navbar?.signOut || "Sign Out"}
                      </button>
                    </li>
                  )}
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
