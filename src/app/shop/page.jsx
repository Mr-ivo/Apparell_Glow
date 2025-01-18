"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useCart } from "../context/CartContext";
import { ShoppingBag, Star, Heart, Award, Sparkles } from 'lucide-react';
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTop/BackToTOP";

const bannerContent = [
  {
    title: "Discover Natural Beauty",
    description: "Premium skincare products for your daily routine"
  },
  {
    title: "Luxury Cosmetics",
    description: "Experience the difference with our premium collection"
  },
  {
    title: "Organic Ingredients",
    description: "Pure and natural ingredients for your skin"
  }
];

export default function ShopContent() {
  const { cartItems, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [favoriteId, setFavoriteId] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://glow-backend-2nxl.onrender.com/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    const exists = cartItems.some(item => item.id === product.id);
    if (!exists) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (productId) => {
    setFavoriteId(favoriteId === productId ? null : productId);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="pt-28 min-h-screen bg-white dark:bg-gray-900">
      {/* Banner Carousel */}
      <div className="relative mb-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-[600px]"
        >
          {products.slice(0, 3).map((product, index) => (
            <SwiperSlide key={product._id}>
              <div className="relative h-full w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-xl text-white">
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl font-bold mb-4"
                      >
                        {bannerContent[index].title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl mb-8"
                      >
                        {bannerContent[index].description}
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
                        onClick={() => window.location.href = `/product/${product._id}`}
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link href={`/product/${product._id}`}>
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transform group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      New
                    </div>
                  )}
                  {mounted && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleFavorite(product._id);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300
                        ${favoriteId === product._id
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-800 hover:bg-red-500 hover:text-white'}`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm px-4 py-2 rounded-full
                               flex items-center gap-2 transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <BackToTopButton />
      <Footer />
    </main>
  );
}
