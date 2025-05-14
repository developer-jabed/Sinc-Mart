import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaReceipt,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

import mart from "../../assets/mart.png";
import AuthContext from "../../Provider/AuthContext/AuthContext";

const NavLinkItem = ({ to, label, icon: Icon, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white"
          : "hover:text-blue-600 text-gray-700"
      }`}
    >
      <Link to={to} className="flex items-center gap-1 w-full">
        <Icon /> {label}
      </Link>
    </motion.div>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const logoRef = useRef(null);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    gsap.to(logoRef.current, {
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "power1.inOut",
      scale: 1.05,
    });
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/products", label: "Products", icon: FaBoxOpen },
    { to: "/category", label: "Categories", icon: FaBoxOpen },
    { to: "/cart", label: "Cart", icon: FaShoppingCart },
    { to: "/orders", label: "Orders", icon: FaReceipt },
  ];

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar w-[90%] mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="navbar-start flex items-center gap-2">
          <motion.h3
            ref={logoRef}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            data-tip="Sinc Mart Home"
          >
            Sinc Mart
          </motion.h3>
          <img src={mart} alt="Sinc Mart Logo" className="w-8 h-8" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex navbar-center md:space-x-3 lg:space-x-6 text-lg items-center font-medium">
          {navLinks.map(({ to, label, icon }, idx) => (
            <NavLinkItem
              key={idx}
              to={to}
              label={label}
              icon={icon}
              currentPath={location.pathname}
            />
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3 navbar-end">
          {user ? (
            <div className="relative">
              <img
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                src={user.photoURL || "https://i.ibb.co/5cLkqLJ/user.png"}
                alt="User"
                className="w-9 h-9 rounded-full border cursor-pointer"
                data-tip="Profile Menu"
              />
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-40"
                  >
                    <div className="px-4 py-2 border-b font-semibold text-blue-700 text-sm">
                      {user.displayName || "User"}
                    </div>
                    <Link
                      to="/add-product"
                      className="flex items-center px-4 py-2 hover:bg-blue-50 text-sm gap-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaPlus /> Add Product
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 hover:bg-blue-50 text-sm gap-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        try {
                          await logOut();
                          Swal.fire({
                            title: "Logged Out",
                            text: "You have been logged out successfully.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                          });
                        } catch (error) {
                          Swal.fire({
                            title: "Logout Failed",
                            text: error.message,
                            icon: "error",
                          });
                        }
                      }}
                      className="p-2 w-[90%] mx-auto bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-1"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLinkItem
              to="/login"
              label="Login"
              icon={FaSignInAlt}
              currentPath={location.pathname}
            />
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-blue-600 md:hidden"
            data-tip={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white shadow-md px-6 py-4 space-y-3 overflow-hidden"
          >
            {navLinks.map(({ to, label, icon }, idx) => (
              <NavLinkItem
                key={idx}
                to={to}
                label={label}
                icon={icon}
                currentPath={location.pathname}
              />
            ))}
            {user ? (
              <>
                <h1 className="text-lg font-semibold text-blue-700">
                  {user.displayName}
                </h1>
                <Link
                  to="/add-product"
                  className="flex items-center gap-2 text-lg text-blue-700"
                >
                  <FaPlus /> Add Product
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-lg text-blue-700"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await logOut();
                      Swal.fire({
                        title: "Logged Out",
                        text: "You have been logged out successfully.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                      });
                    } catch (error) {
                      Swal.fire({
                        title: "Logout Failed",
                        text: error.message,
                        icon: "error",
                      });
                    }
                  }}
                  className="p-2 m-2 bg-red-600 w-[90%] mx-auto text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-1"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <NavLinkItem
                to="/login"
                label="Login"
                icon={FaSignInAlt}
                currentPath={location.pathname}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Tooltip id="nav-tooltip" place="bottom" effect="float" />
    </div>
  );
};

export default NavBar;
