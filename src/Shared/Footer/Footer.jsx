import React, { useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiAmericanexpress,
} from "react-icons/si";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="mt-20 mb-0 sm:m-8  sm:rounded-2xl  bg-gradient-to-r from-blue-900 to-gray-900 text-white pt-10 pb-6 px-6 md:px-20"
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-3">Sinc Mart</h2>
          <p className="text-sm text-gray-300">
            Your one-stop destination for tech gadgets, lifestyle products, and
            more. Trusted by millions.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/orders" className="hover:text-white">
                Orders
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-white">
                Cart
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white">
                Login
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-red-500">
              <FaYoutube />
            </a>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
          <div className="flex space-x-4 text-3xl text-gray-300">
            <SiVisa className="hover:text-white" />
            <SiMastercard className="hover:text-white" />
            <SiPaypal className="hover:text-white" />
            <SiAmericanexpress className="hover:text-white" />
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Sinc Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
