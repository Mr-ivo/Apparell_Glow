 "use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useCart } from "./context/CartContext";
import BackToTopButton from "./BackToTop/BackToTOP";
import Footer from "./Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const { addToCart } = useCart();
  const [currentProduct, setCurrentProduct] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://glow-backend-2nxl.onrender.com/api/products"
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter
      ? product.category === selectedFilter
      : true;
    return matchesSearch && matchesFilter;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <ToastContainer />
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
                <button
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black 
                  rounded-full text-lg font-semibold transition-all duration-300 
                  hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105"
                >
                  Explore Collection
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 relative h-full overflow-hidden"
          style={{ y }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentProduct ? 1 : 0,
                scale: index === currentProduct ? 1 : 1.1,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="relative h-full grid content-center w-full">
                <Image
                  src={product.image}
                  width={700}
                  height={400}
                  alt={product.name}
                  className="rounded-lg w-full h-full brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <div className="py-4 px-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white w-64"
        />
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Categories</option>
          {["soap", "perfumes", "glycolic", "tube", "body lotions"].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>

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
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <Link href={`/${product._id}`}>
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
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        CAF{product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="ml-2 text-sm line-through text-gray-500">
                          CAF{product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleAddToCart(product)}
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

      <Footer />
      <BackToTopButton />
    </div>
  );
}
