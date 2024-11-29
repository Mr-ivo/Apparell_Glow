"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useCart } from "./context/CartContext";
import BackToTopButton from "./BackToTop/BackToTOP";
import Footer from "./Footer/Footer";

export default function Page() {
  const { addToCart } = useCart();
  const [currentProduct, setCurrentProduct] = useState(0);
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const products = [
    {
      id: 1,
      name: "Nivea Q10",
      price: 4500,
      oldPrice: 2500,
      image: "/images (1).jpeg",
      color: "#4A90E2",
    },
    {
      id: 2,
      name: "Valina Body Lotion",
      price: 8000.0,
      oldPrice: 6000.0,
      image: "/Valina.jpeg",
      color: "#50E3C2",
    },
    {
      id: 3,
      name: "Barty",
      price: 6000,
      oldPrice: 3000,
      image: "/barty.jpeg",
      color: "#F5A623",
    },
    {
      id: 4,
      name: "Derma",
      price: 2000,
      oldPrice: 2000,
      image: "/derma.jpeg",
      color: "#D0021B",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <motion.section
        ref={heroRef}
        className="relative h-[70vh] flex flex-col md:flex-row"
        style={{ opacity }}
      >
        <motion.div 
          className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 dark:text-white"
            >
              Beauty Unleashed
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300"
            >
              Discover the essence of natural beauty with our curated collection
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/shop">
                <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black 
                  rounded-full text-lg font-semibold transition-all duration-300 
                  hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105">
                  Explore Collection
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Animated Image Carousel */}
        <motion.div 
          className="w-full md:w-1/2 relative h-full overflow-hidden"
          style={{ y }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentProduct ? 1 : 0,
                scale: index === currentProduct ? 1 : 1.1
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="relative h-full w-full">
              <Image
                  src={product.image}
                  width={700} 
                  height={400} 
                  alt={product.name}
                  className="rounded-lg object-cover filter brightness-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Products Grid */}
      <motion.section
        ref={productsRef}
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        animate={isProductsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    layout="fill"
                    objectFit="cover"
                    alt={product.name}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        CAF{product.price}
                      </span>
                      <span className="ml-2 text-sm line-through text-gray-500">
                        CAF{product.oldPrice}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg
                      transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Product Showcase Section */}
      <motion.section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={products[currentProduct].image}
                  layout="fill"
                  objectFit="cover"
                  alt={products[currentProduct].name}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundColor: products[currentProduct].color }}  //representing the infinity line 
              />
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
                {products[currentProduct].name}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience the power of nature with our premium skincare products.
                Each product is carefully formulated to enhance your natural beauty.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(products[currentProduct])}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full
                  text-lg font-semibold transition-all duration-300"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <BackToTopButton />
      <Footer />
    </div>
  );
}