import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Eye, EyeOff } from "lucide-react";
import animationData from "../../assets/animations/register.json";
import Swal from "sweetalert2";
import AuthContext from "../../Provider/AuthContext/AuthContext";


const Register = () => {
  const navigate = useNavigate();
  const { createUser, loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    password: "",
    
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isValidLength) {
      toast.error(
        "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password) || !validateEmail(form.email)) return;

    try {
      await createUser(form.email, form.password);

      const users = {
        email: form.email,
        photoURL: form.photoURL,
        displayName: form.displayName,
        role: "user", 
      };

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
      });

      if (!response.ok) {
        throw new Error("Error saving user to MongoDB");
      }

      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "Go to Home",
      }).then(() => navigate("/"));
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters long.");
      } else {
        toast.error(error.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 bg-white flex items-center justify-center p-6">
          <Lottie
            animationData={animationData}
            loop
            className="w-full max-w-xs"
          />
        </div>

        <div className="md:w-1/2 bg-white p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={form.displayName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
              required
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              value={form.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
