import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaPlusCircle, FaListAlt, FaHome } from "react-icons/fa";

const navItems = [
  { path: "/", label: "Home", icon: <FaHome /> },
  { path: "/dashboard/my-profile", label: "My Profile", icon: <FaUser /> },
  { path: "/dashboard/my-products", label: "My Products", icon: <FaListAlt /> },
];

const UserDashboard = () => {
  return (
    <aside className="w-full md:w-64 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
          <FaUser className="text-blue-600" />
          User Dashboard
        </h1>
        <nav>
          <ul className="space-y-4">
            {navItems.map(({ path, label, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-lg">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default UserDashboard;
