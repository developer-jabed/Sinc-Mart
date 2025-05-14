/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaCartPlus, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const PRODUCTS_PER_PAGE = 6;

const Category = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tabRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Products");
        setProducts(res.data);
        setSelectedCategory(res.data[0]?.category || "");
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tabRef.current) {
      gsap.from(tabRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1,
      });
    }
    setCurrentPage(1); // Reset page when category changes
  }, [selectedCategory]);

  const categories = [...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if already in cart
    const alreadyInCart = cart.find((item) => item._id === product._id);
    if (alreadyInCart) {
      Swal.fire("Oops!", "This product is already in your cart.", "info");
      return;
    }

    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="flex flex-col gap-8 p-4 w-[90%] mx-auto">
      <div className="flex gap-5">
        {/* Category Tabs */}
        <div className="flex flex-col gap-3 bg-[#755372] p-3 rounded-lg items-start h-fit">
          {categories.map((category) => (
            <motion.button
              key={category}
              ref={tabRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto gap-6 flex-1"
          >
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Brand: {product.brand}
                  </p>
                  <p className="text-blue-600 font-bold text-lg mb-2">
                    ${product.price}
                  </p>
                </Link>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 transition"
                  >
                    <FaCartPlus /> Add to Cart
                  </button>
                  <Link
                    to={`/product/${product._id}`}
                    className="flex items-center gap-1 border border-blue-500 text-blue-600 px-3 py-1 rounded-xl hover:bg-blue-100 transition"
                  >
                    <FaInfoCircle /> Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">
            No products in this category.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex w-[90%] mx-auto justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded hover:bg-blue-100 ${
                currentPage === index + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
