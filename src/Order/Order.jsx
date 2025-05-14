import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Provider/AuthContext/AuthContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire(
        "Please log in",
        "You need to be logged in to view your orders",
        "warning"
      );
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/order");
        const data = await response.json();

        const filteredOrders = data.filter(
          (order) => order.purchaser.email === user.email
        );
        setOrders(filteredOrders);

        gsap.from(".order-item", {
          opacity: 70,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        Swal.fire("Error", "Failed to fetch orders", "error");
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-5 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-center text-blue-600 flex justify-center items-center gap-3">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-xl mt-20 text-gray-600">
          No orders found!
        </p>
      ) : (
        <div className="max-w-5xl mx-auto mt-10 space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="order-item bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.purchaser.photoURL}
                  alt={order.purchaser.displayName}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">
                    {order.purchaser.displayName}
                  </h3>
                  <p className="text-gray-600">{order.purchaser.email}</p>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>
                  Order placed on:{" "}
                  {new Date(order.purchaser.timestamp).toLocaleString()}
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "pending"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="order-items mt-4">
                <h4 className="text-lg font-semibold text-blue-700">Items:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="cart-item bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 hover:shadow-2xl transition"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold text-blue-700">
                          {item.name}
                        </h5>
                        <p className="text-gray-600">Price: ${item.price}</p>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Order;
