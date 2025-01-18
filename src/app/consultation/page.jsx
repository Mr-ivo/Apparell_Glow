"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ConsultationPage() {
  const [skinConcerns, setSkinConcerns] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const analyzeSkinConcerns = (concerns) => {
    const concernsLower = concerns.toLowerCase();
    const skinConcernKeywords = {
      acne: ["acne", "pimple", "breakout", "blemish", "spot treatment"],
      dryness: ["dry", "dehydrated", "flaky", "moisturizing", "hydrating"],
      aging: ["aging", "wrinkle", "fine line", "mature", "anti-aging"],
      sensitive: ["sensitive", "gentle", "soothing", "calming", "irritated"],
      oily: ["oily", "greasy", "shine", "mattifying", "oil-control"],
      pigmentation: ["dark spot", "hyperpigmentation", "uneven tone", "brightening"],
      combination: ["combination", "t-zone", "mixed"],
      pores: ["pore", "blackhead", "congested"],
      redness: ["redness", "rosacea", "inflammation"],
    };


    const matchedConcerns = Object.entries(skinConcernKeywords).filter(([_, keywords]) =>
      keywords.some(keyword => concernsLower.includes(keyword))
    ).map(([concern]) => concern);

    return matchedConcerns;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const matchedConcerns = analyzeSkinConcerns(skinConcerns);
      
      if (matchedConcerns.length === 0) {
        toast.info("Please describe your concerns using terms like 'acne', 'dry skin', 'oily', 'aging', 'dark spots', etc.");
        setLoading(false);
        return;
      }
      const response = await fetch("https://glow-backend-2nxl.onrender.com/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const allProducts = await response.json();
      const recommendedProducts = allProducts.filter(product => {
        const productText = (product.name + " " + product.description).toLowerCase();
        return matchedConcerns.some(concern => {
          switch(concern) {
            case "acne":
              return productText.includes("acne") || productText.includes("blemish") || 
                     productText.includes("spot") || productText.includes("clear");
            case "dryness":
              return productText.includes("moisturiz") || productText.includes("hydrat") || 
                     productText.includes("dry");
            case "aging":
              return productText.includes("aging") || productText.includes("wrinkle") || 
                     productText.includes("firm") || productText.includes("lift");
            case "sensitive":
              return productText.includes("sensitive") || productText.includes("gentle") || 
                     productText.includes("sooth");
            case "oily":
              return productText.includes("oily") || productText.includes("mattify") || 
                     productText.includes("oil control");
            case "pigmentation":
              return productText.includes("brighten") || productText.includes("dark spot") || 
                     productText.includes("even");
            case "combination":
              return productText.includes("combination") || productText.includes("balance");
            case "pores":
              return productText.includes("pore") || productText.includes("blackhead") || 
                     productText.includes("clarify");
            case "redness":
              return productText.includes("redness") || productText.includes("calm") || 
                     productText.includes("sooth");
            default:
              return false;
          }
        });
      });

      if (recommendedProducts.length === 0) {
        toast.info("No specific products found for your concerns. Showing all skincare products instead.");
        setRecommendations(allProducts);
      } else {
        toast.success(`Found ${recommendedProducts.length} products for your concerns!`);
        setRecommendations(recommendedProducts);
      }
    } catch (error) {
      console.error("Error processing consultation:", error);
      toast.error("Sorry, there was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 min-h-screen p-6 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <ToastContainer position="top-right" autoClose={5000} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Skin Consultation
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="skinConcerns" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Describe your skin concerns
              </label>
              <textarea
                id="skinConcerns"
                value={skinConcerns}
                onChange={(e) => setSkinConcerns(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows="4"
                placeholder="Example: I have dry skin with some acne, and I'm also concerned about dark spots..."
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Try mentioning specific concerns like: acne, dry skin, oily skin, aging, dark spots,
                sensitive skin. large pores, or redness.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg
                       transition duration-200 ease-in-out disabled:opacity-50"
            >
              {loading ? "Finding products..." : "Get Recommendations"}
            </button>
          </form>
        </motion.div>

        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <Link href={`/${product._id}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {product.description}
                      </p>
                      <p className="text-lg font-bold text-blue-600 mt-2">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
