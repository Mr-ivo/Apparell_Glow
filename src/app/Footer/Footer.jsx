'use client';
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Send, Mail, Phone, MapPin } from 'lucide-react';
import Link from "next/link";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    console.log("Newsletter signup email:", newsletterEmail);
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/apparellglow', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/apparellglow', color: 'hover:bg-pink-600' },
    { name: 'Telegram', icon: Send, url: 'https://t.me/apparellglow', color: 'hover:bg-blue-500' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info & Newsletter */}
        <motion.div 
          className="space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/" className="inline-block">
            <h3 className="text-2xl font-bold text-white hover:text-blue-500 transition-colors">
              ApparellGlow
            </h3>
          </Link>
          <p className="text-gray-400">
            Discover the latest trends in fashion and beauty with ApparellGlow.
          </p>
          <form onSubmit={handleNewsletterSignup} className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Newsletter</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 
                  focus:outline-none transition-all duration-300"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400
                  transition-colors duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-gray-400 hover:text-white transition-colors duration-300 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <div className="space-y-4">
            <Link href="mailto:ebongthierry569@gmail.com" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <Mail size={20} className="text-blue-500" />
              <span>ebongthierry569@gmail.com</span>
            </Link>
            <Link href="tel:+237679373244" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <Phone size={20} className="text-blue-500" />
              <span>+237 679373244</span>
            </Link>
            <Link href="/contact" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <MapPin size={20} className="text-blue-500" />
              <span>Akwa Nord, Douala, Cameroon</span>
            </Link>
          </div>
        </motion.div>

        {/* Payment Methods & Social */}
        <motion.div 
          className="space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
          <div className="flex space-x-4">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-2">
              <Image
                src="/Mtn.jpg"
                alt="MTN Payment"
                layout="fill"
                objectFit="contain"
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-2">
              <Image
                src="/Orange.png"
                alt="Orange Payment"
                layout="fill"
                objectFit="contain"
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                    transition-colors duration-300 ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        className="mt-16 pt-8 border-t border-gray-800 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} ApparellGlow. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}