'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import BackToTopButton from '../BackToTop/BackToTOP';
import Footer from '../Footer/Footer';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Page() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_#000000_25%,_transparent_25%,_transparent_75%,_#000000_75%,_#000000_100%)] bg-[length:20px_20px] opacity-5"></div>
        </div>
        
        <div className="text-center z-10 px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
          >
            Welcome to ApparellGlow
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
          >
            Your trusted destination for premium skincare and beauty products.
          </motion.p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <motion.div 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto px-4 py-16 space-y-24"
      >
        {/* Our Story */}
        <motion.section 
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At ApparellGlow, we believe that beauty is not just about appearances, but about self-confidence, well-being, and self-expression. 
              Established in 2004, our mission has always been to provide high-quality, natural, and ethically sourced cosmetic products to our customers.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our founder, MR IVO started the journey after realizing that skincare products should nourish and protect, not harm, your skin. With a deep passion for natural ingredients, we carefully curate products that are designed to bring out the best in every skin type.
            </p>
          </div>
          <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg"></div>
        </motion.section>

        {/* Our Mission */}
        <motion.section 
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 h-64 bg-gradient-to-bl from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg"></div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our mission is simple: to empower individuals to feel confident in their skin by offering skincare solutions that are as effective as they are gentle. We are committed to using clean, safe, and high-performance ingredients that respect your skin and the environment.
            </p>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section 
          variants={fadeInUp}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Natural Ingredients", desc: "We believe in harnessing the power of nature. Our products are free from harmful chemicals and toxins." },
              { title: "Cruelty-Free", desc: "We are proud to offer cruelty-free products, never tested on animals." },
              { title: "Quality Assurance", desc: "Every product is carefully selected and tested to meet our high standards of quality and effectiveness." },
              { title: "Sustainable Packaging", desc: "We care about the planet. Our packaging is eco-friendly and sustainable." }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          variants={fadeInUp}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you have questions about our products, need skincare advice, or simply want to share your beauty journey, we're here for you! Reach out to us through our social media platforms or send us an email at ebongthierry569@gmail.com.
          </p>
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <item.Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.section>
      </motion.div>

      <BackToTopButton />
      <Footer />
    </div>
  );
}