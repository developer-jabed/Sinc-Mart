import React, { useEffect, useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaTrash,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../../Provider/AuthContext/AuthContext";
import Swal from "sweetalert2"; // Import SweetAlert2

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    Swal.fire({
      icon: "success",
      title: "Item Removed",
      text: "The item has been successfully removed from your cart.",
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to proceed with the checkout.",
      });
      return;
    }

    // Get the current date and time
    const currentDate = new Date().toLocaleString(); // Customize format if needed

    try {
      const response = await fetch("http://localhost:5000/product/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchaser: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            timestamp: currentDate, // Adding timestamp
          },
          items: cartItems,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Checkout Successful!",
          text: "Your order has been placed successfully.",
        });
        localStorage.removeItem("cart");
        setCartItems([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Checkout Failed",
          text: data.message || "Something went wrong, please try again.",
        });
      }
    } catch (err) {
      console.error("Checkout error:", err);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "There was an error processing your checkout. Please try again.",
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-5 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-center text-blue-600 flex justify-center items-center gap-3">
        <FaShoppingCart /> Your Cart
      </h1>

      <div className="w-[300px] mx-auto flex gap-3 mt-12 text-center">
        <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-xl shadow-md text-xl font-semibold space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FaMoneyBillWave /> Total: $
            {cartItems.reduce((total, item) => total + item.price, 0)}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCheckout}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition justify-center"
          >
            <FaCreditCard /> Checkout
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl mt-20 text-gray-600">
          Your cart is empty!
        </p>
      ) : (
        <div className="max-w-5xl mx-auto mt-10 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-item bg-white shadow-lg rounded-2xl flex items-center gap-6 p-6 hover:shadow-2xl transition border-l-4 border-blue-500"
            >
              <Link
                to={`/product/${item._id}`}
                className="flex-1 flex items-center gap-6"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
