import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  FaCartPlus,
  FaTags,
  FaBoxOpen,
  FaStar,
  FaCheckCircle,
  FaFlag,
  FaCommentDots,
} from "react-icons/fa";
import Swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AuthContext from "../../Provider/AuthContext/AuthContext";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reports, setReports] = useState([]);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    fetch(`http://localhost:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reverse()));

    fetch(`http://localhost:5000/reports/${id}`)
      .then((res) => res.json())
      .then((data) => setReports(data.reverse()));
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) return;
    const newReview = {
      productId: id,
      review: reviewText,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (res.ok) {
      Swal.fire("Thanks!", "Your review has been submitted.", "success");
      setReviewText("");
      setReviews((prev) => [newReview, ...prev]);
    }
  };

  const handleReportSubmit = async () => {
    if (!reportReason.trim()) return;

    const newReport = {
      productId: id,
      reason: reportReason,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport),
    });

    if (res.ok) {
      Swal.fire("Reported", "The product has been reported.", "warning");
      setReportReason("");
      setReports((prev) => [newReport, ...prev]);
    }
  };

  const handleAddToCart = () => {
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

  if (!product) {
    return (
      <p className="text-center text-xl mt-20 text-blue-600 animate-pulse">
        Loading product details...
      </p>
    );
  }

  return (
    <motion.div
      className="min-h-screen px-5 py-10 bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-[350px] object-cover rounded-lg"
          whileHover={{ scale: 1.03 }}
        />
        <div className="space-y-4">
          <motion.h2
            className="text-3xl font-bold text-blue-600"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {product.name}
          </motion.h2>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <InfoTag
              icon={<FaTags />}
              text={`$${product.price}`}
              color="blue"
            />
            <InfoTag
              icon={<FaCheckCircle />}
              text={product.availability}
              color="green"
            />
            <InfoTag
              icon={<FaStar />}
              text={product.rating || "Not Rated"}
              color="yellow"
            />
            <InfoTag
              icon={<FaBoxOpen />}
              text={product.category}
              color="purple"
            />
          </div>
          {product.features?.length > 0 && (
            <ul className="mt-5 space-y-1">
              <p className="font-semibold text-gray-700">Key Features:</p>
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <FaCheckCircle className="text-blue-500" /> {feature}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaCartPlus /> Add to Cart
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Section */}
      <div className="max-w-3xl mx-auto mt-10 flex justify-center gap-4">
        <button
          onClick={() => setShowReports(false)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            !showReports
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-blue-600 hover:bg-gray-200"
          }`}
        >
          Show Reviews
        </button>
        <button
          onClick={() => setShowReports(true)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            showReports
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-red-500 hover:bg-gray-200"
          }`}
        >
          Show Reports
        </button>
      </div>

      {/* Review or Report Submission */}
      {!showReports ? (
        <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2 mb-4">
            <FaCommentDots /> Write a Review
          </h3>
          <textarea
            className="w-full border border-blue-300 rounded-lg p-3 mb-4 focus:outline-blue-500"
            rows="4"
            placeholder="Share your thoughts about this product..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-red-500 flex items-center gap-2 mb-4">
            <FaFlag /> Report Product
          </h3>
          <textarea
            className="w-full border border-red-300 rounded-lg p-3 mb-4 focus:outline-red-500"
            rows="3"
            placeholder="Why are you reporting this product?"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
          <button
            onClick={handleReportSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Submit Report
          </button>
        </div>
      )}

      {/* Display Reviews or Reports */}
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        {(showReports ? reports : reviews).map((item, i) => (
          <motion.div
            key={i}
            className={`bg-white rounded-xl shadow p-4 flex gap-4 items-start ${
              showReports ? "border-l-4 border-red-400" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <img
              src={item.photoURL || "/default-avatar.jpg"}
              alt={item.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h4 className="font-semibold">{item.displayName}</h4>
              <p className="text-sm text-gray-600">{item.timestamp}</p>
              <p className="mt-2">{item.review || item.reason}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const InfoTag = ({ icon, text, color }) => (
  <div
    className={`flex items-center gap-2 px-4 py-1 border rounded-full text-${color}-600 border-${color}-300 bg-${color}-50`}
  >
    {" "}
    {icon} {text}{" "}
  </div>
);
export default Details;
