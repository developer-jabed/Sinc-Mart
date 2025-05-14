import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FaCartPlus, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch("http://localhost:5000/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, [products, currentPage]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.brand} ${product.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="w-[90%] mx-auto min-h-screen py-10 bg-gradient-to-br from-blue-50 to-white px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Our Products
      </h2>

      {/* Search input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name, category, or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product._id}
            ref={(el) => (cardsRef.current[index] = el)}
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
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
