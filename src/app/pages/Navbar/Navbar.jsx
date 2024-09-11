"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import styles from "../Navbar/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "@/app/ThemeToggleButton/ThemeToggleButton";
import { useCart } from "@/app/context/CartContext";

const Navbar = ({ color, bg }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsScrolled(currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        style={{
          background: bg,
        }}
        className={`${styles.header} ${isScrolled && styles.scrolled}`}
      >
        {/* Logo Section */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              className={styles.img}
              src={"/glow.png"}
              height={25}
              width={200}
            />
          </Link>
        </div>
        <ThemeToggleButton />

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/about" className={styles.navLink}>
              About Us
            </Link>
            <Link href="/shop" className={styles.navLink}>
              Shop
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact Us
            </Link>
            <Link href={"/cart"}>
              <p className={styles.four}>{cartItems.length}</p>
              <FaShoppingCart className={styles.cartIcon} />
            </Link>
          </div>

          {/* Hamburger Menu */}
          <FaBars className={styles.hamburgerIcon} onClick={toggleMenu} />
        </nav>

        {/* Pop-up Menu for Mobile */}
        {isMenuOpen && (
          <div className={styles.menuPopup}>
            <FaTimes className={styles.closeIcon} onClick={toggleMenu} />
            <Link href="/" className={styles.popupNavLink} onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/about"
              className={styles.popupNavLink}
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/shop"
              className={styles.popupNavLink}
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={styles.popupNavLink}
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
