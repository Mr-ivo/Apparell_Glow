 "use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../../app/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function ProductDetail({ params }) {
  const { id } = params;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://glow-backend-2nxl.onrender.com/api/products/${id}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          const errorMessage = `Failed to fetch product. Status: ${response.status} (${response.statusText}). URL: ${response.url}`;
          console.error(errorMessage);
          setError(errorMessage);
          return; 
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("An error occurred while fetching the product data:", error);
        setError("An error occurred while fetching the product data."); 
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-500">No product found.</p>;
  }

  const { name, description, price, oldPrice, image } = product;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ToastContainer />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div className="relative w-full h-96 md:h-[500px]">
            <Image
              src={image || "/placeholder.png"}
              layout="fill"
              objectFit="cover"
              alt={name || "Product Image"}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {name || "Product Name"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {description || "No description available."}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                CAF{price}
              </span>
              {oldPrice && (
                <span className="text-sm line-through text-gray-500">
                  CAF{oldPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="quantity"
                className="text-gray-600 dark:text-gray-300"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                aria-label="Quantity"
                className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white w-20"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleAddToCart}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg
            transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
