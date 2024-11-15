'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Star, Heart, Award, Sparkles } from 'lucide-react';
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTop/BackToTOP";

const products = [
  {
    id: 1,
    name: "Hydrating Cream Mask",
    price: "12,000",
    image: "/images/image3.jpeg",
    description: "A rich cream mask that deeply hydrates and replenishes moisture.",
    rating: 4.8,
    reviews: 128,
    category: "Face Care"
  },
  {
    id: 2,
    name: "Body Butter",
    price: "70,000",
    image: "/images/image2.jpeg",
    description: "Luxurious body butter made with organic ingredients for deep nourishment.",
    rating: 4.9,
    reviews: 256,
    category: "Body Care"
  },
  {
    id: 3,
    name: "Organic High-Curcumin Serum",
    price: "65,000",
    image: "/images/image1.jpeg",
    description: "Powerful serum with curcumin for brightening and rejuvenation.",
    rating: 4.7,
    reviews: 189,
    category: "Serums"
  },
];

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

export default function ShopContent() {
  const { cartItems, addToCart } = useCart();

  const handleAddToCart = (product) => {
    const exists = cartItems.some(item => item.id === product.id);
    if (!exists) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/image2.jpeg"
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

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Face Care', 'Body Care', 'Serums'].map((category, index) => (
              <motion.div
                key={category}
                className="relative group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={`/image2.jpeg`}
                    alt={category}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white rounded-full shadow-md"
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

      {/* Features Section */}
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