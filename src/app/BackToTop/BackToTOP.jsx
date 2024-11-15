'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Throttle the scroll event for better performance
    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full 
            bg-black dark:bg-white text-white dark:text-black
            shadow-lg hover:shadow-xl transition-shadow duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-gray-500 dark:focus:ring-gray-300"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-black dark:bg-white opacity-20"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <ArrowUp className="w-6 h-6 relative z-10" />
            
            {/* Hover effect circle */}
            <motion.div
              className="absolute inset-0 bg-black dark:bg-white rounded-full opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;