'use client'; 
import React, { useState, useEffect } from "react"; 
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Star, Heart, Award, Sparkles } from 'lucide-react';
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTop/BackToTOP";

export default function ShopContent() {
  const { cartItems, addToCart } = useCart();
  const [products, setProducts] = useState([]); 
  const [favorites, setFavorites] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://glow-backend-2nxl.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const exists = cartItems.some(item => item.id === product.id);
    if (!exists) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some(item => item.id === product.id)) {
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
     <motion.section 
  className="relative h-[80vh] flex items-center justify-center overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="absolute inset-0 z-0">
    <Image
      src="data:image/jpeg;base64,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" 
      alt="Beauty products background"
      fill
      className="object-cover blur-sm"
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>
  
  <div className="relative z-10 text-center text-white px-4 max-w-4xl">
    <motion.h1 
      className="text-5xl md:text-6xl font-bold mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Discover Your Natural Beauty
    </motion.h1>
    <motion.p 
      className="text-xl md:text-2xl mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      Premium skincare products crafted with natural ingredients
    </motion.p>
    <motion.button
      className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Shop Now
    </motion.button>
  </div>
</motion.section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Best Sellers
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-72">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <motion.button
                      onClick={() => handleToggleFavorite(product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-full shadow-md ${favorites.some(item => item.id === product.id) ? 'bg-red-500' : 'bg-white'}`}
                    >
                      <Heart className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">{product.category}</span>
                    <div className="ml-auto flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">CAF {product.price}</span>
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <BackToTopButton />
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Natural Ingredients",
                description: "100% natural and organic ingredients sourced globally"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Quality Guaranteed",
                description: "Certified products with proven results"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Cruelty Free",
                description: "Never tested on animals, always kind to nature"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                variants={fadeInUp}
              >
                <motion.div 
                  className="inline-block p-4 bg-gray-50 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
