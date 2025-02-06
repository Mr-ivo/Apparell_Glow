"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Heart, Star, Search } from "lucide-react";
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTop/BackToTOP";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const heroSlides = [
  {
    title: "Natural Beauty Collection",
    subtitle: "Discover the power of natural ingredients",
    description: "Handcrafted with love and care for your skin",
    buttonText: "Shop Now",
    bgColor: "from-rose-400 to-pink-600",
  },
  {
    title: "Premium Fragrances",
    subtitle: "Exclusive Collection 2024",
    description: "Experience luxury with our signature scents",
    buttonText: "Explore",
    bgColor: "from-violet-400 to-purple-600",
  },
  {
    title: "Organic Skincare",
    subtitle: "Pure & Natural",
    description: "Transform your skincare routine naturally",
    buttonText: "View Products",
    bgColor: "from-blue-400 to-indigo-600",
  },
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "soap", name: "Soaps" },
  { id: "perfumes", name: "Perfumes" },
];

export default function ShopContent() {
  const { cartItems, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    fetchProducts();
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://glow-backend-2nxl.onrender.com/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.toLowerCase() === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const handleToggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
  };

  
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    toast.success(`${product.name} has been added to your cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "#2563eb", 
        color: "white",
        borderRadius: "0.5rem",
      },
    });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative h-[80vh] mb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8 max-w-4xl">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-sm font-medium uppercase tracking-wider mb-4"
                    >
                      {slide.subtitle}
                    </motion.h2>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-5xl md:text-7xl font-bold mb-6"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-lg md:text-xl mb-8"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium
                               hover:bg-opacity-90 transition duration-300 transform hover:scale-105"
                    >
                      {slide.buttonText}
                    </motion.button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 overflow-x-auto w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                            transition-all duration-300 ${
                              selectedCategory === category.id
                                ? "bg-gradient-to-r bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700
                         dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                           shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Link href={`/product/${product._id}`}>
                    <div className="relative h-80">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleFavorite(product._id);
                        }}
                        className={`absolute top-4 right-4 p-2.5 rounded-full
                                  transition-all duration-300 ${
                                    favorites.has(product._id)
                                      ? "bg-red-500 text-white"
                                      : "bg-white/80 text-gray-800 hover:bg-red-500 hover:text-white"
                                  }`}
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600 dark:text-purple-400">
                          CAF {product.price?.toLocaleString()}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="bg-gradient-to-r bg-blue-600 text-white
                                   px-2 py-2 rounded-full flex items-center gap-2 text-sm
                                   hover:opacity-90 transition-opacity duration-300"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BackToTopButton />
      <Footer />
    </main>
  );
}
