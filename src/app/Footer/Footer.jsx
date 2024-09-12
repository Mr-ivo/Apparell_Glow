'use client'
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";


export default function Footer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login details:", { email, password });
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    console.log("Newsletter signup email:", newsletterEmail);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Login Section */}
        <div className={styles.column}>
          <h3 className={styles.title}>Customer Login</h3>
          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Login</button>
          </form>
        </div>

        {/* Payment Methods */}
        <div className={styles.column}>
          <h3 className={styles.title}>Payment Methods</h3>
          <div className={styles.paymentMethods}>
            <div className={styles.paymentMethod}>
              <Image src="/Mtn.jpg" alt="MTN Payment" width={40} height={40} />
            </div>
            <div className={styles.paymentMethod}>
              <Image src="/Orange.png" alt="Orange Payment" width={40} height={40} />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.column}>
          <h3 className={styles.title}>Get In Touch</h3>
          <p className={styles.contactInfo}>Email: ebongthierry569@gmail.com</p>
          <p className={styles.contactInfo}>Phone: +237 679373244</p>
          <p className={styles.contactInfo}>Address: Akwa Nord, Douala, Cameroon</p>
        </div>

        {/* Newsletter Subscription */}
        <div className={styles.column}>
          <h3 className={styles.title}>Subscribe to Newsletter</h3>
          <form onSubmit={handleNewsletterSignup} className={styles.form}>
            <input
              type="email"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Subscribe</button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className={styles.column}>
          <h3 className={styles.title}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <FaFacebook  />
            <FaInstagram />
            <FaTelegram />
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.two}
        >&copy; 2024 ApparellGlow. All rights reserved.</p>
      </div>
    </footer>
  );
}
