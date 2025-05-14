import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animations/login.json";
import auth from "../../Firebase/Firebase.init";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state || "/";
  const googleProvider = new GoogleAuthProvider();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate(redirectPath), 2000);
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Fetch user details
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      // POST the user data to your backend (MongoDB)
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Logged in with Google!",
          text: "User data saved successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate(redirectPath), 2000);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Google Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Animation */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-6">
          <Lottie
            animationData={loginAnimation}
            loop
            className="w-full max-w-xs"
          />
        </div>

        {/* Form */}
        <div className="md:w-1/2 bg-white p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Welcome Back 👋
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
              required
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
            >
              Log In
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 mb-2">Or login with</p>
            <button
              onClick={handleGoogleLogin}
              className="bg-white border border-gray-300 text-indigo-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 transition duration-300"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
