// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-20 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold"
      >
        Welcome to Sinc Mart
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-4 text-lg md:text-xl"
      >
        Discover the best products at unbeatable prices
      </motion.p>
      <div className="mt-8 space-x-4">
        <Link
          to="/products"
          className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          Shop Now
        </Link>
        <Link
          to="/category"
          className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-800 transition-all duration-300"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
