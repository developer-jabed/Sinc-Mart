import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Users2, Package } from "lucide-react"; // Package icon for "Manage Product"

const AdminDashboard = () => {
  const cards = [
    {
      title: "Statistics",
      link: "/dashboard/statistics",
      color: "from-purple-400 to-indigo-500",
      icon: <BarChart3 className="w-5 h-5 mr-2" />,
    },
    {
      title: "Manage Users",
      link: "/dashboard/manage-users",
      color: "from-green-400 to-emerald-500",
      icon: <Users2 className="w-5 h-5 mr-2" />,
    },
    {
      title: "Manage Product",
      link: "/dashboard/manage-product", // This is the new route
      color: "from-orange-400 to-amber-500",
      icon: <Package className="w-5 h-5 mr-2" />, // Use a different icon
    },
  ];

  return (
    <div className="md:min-h-screen bg-gray-100 px-4 py-10 mt-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Cards layout */}
      <div className="flex flex-col gap-2 md:gap-6 md:max-w-6xl lg:max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className={`rounded-2xl shadow-xl p-2 md:p-6 bg-gradient-to-br ${card.color} text-white hover:scale-105 transition-transform duration-300`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {/* Title and text for larger screens */}
            <h2 className="text-2xl font-semibold mb-4 hidden sm:block">
              {card.title}
            </h2>
            <p className="mb-4 hidden sm:block">
              Go to {card.title} section to manage and monitor system
              activities.
            </p>

            {/* Link visible on all screens */}
            <Link
              to={card.link}
              className="inline-flex items-center bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition"
            >
              {card.icon}
              <span className="sm:hidden">{card.title}</span>{" "}
              {/* Only show title on small screens */}
            </Link>
          </motion.div>
        ))}
        <div>
          <Link
            className="text-lg md:text-xl font-medium transition-all duration-300 transform rounded-lg p-2 bg-amber-300 mt-4 hover:text-blue-700 hover:scale-110 flex items-center gap-2"
            to="/"
          >
            GO to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
