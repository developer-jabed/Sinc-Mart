import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import gsap from "gsap";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

const AddProduct = () => {
  const formRef = useRef(null);

  const [product, setProduct] = useState({
    img: "",
    brand: "",
    name: "",
    availability: "",
    status: "",
    description: "",
    category: "",
    price: "",
    product_type: "",
    features: "",
    purchase_count: "",
  });

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 100,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalProduct = {
      ...product,
      price: parseFloat(product.price),
      purchase_count: parseInt(product.purchase_count),
      features: product.features.split(",").map((f) => f.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/Products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }



      Swal.fire({
        title: "Success!",
        text: "Product added successfully!",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
      });

      // Reset form
      setProduct({
        img: "",
        brand: "",
        name: "",
        availability: "",
        status: "",
        description: "",
        category: "",
        price: "",
        product_type: "",
        features: "",
        purchase_count: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add product. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6 flex items-center justify-center">
      <motion.div
        ref={formRef}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8 flex items-center justify-center gap-2">
          <FaPlusCircle className="text-purple-500" /> Add New Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { name: "img", label: "Image URL" },
            { name: "brand", label: "Brand" },
            { name: "name", label: "Product Name" },
            { name: "availability", label: "Availability" },
            { name: "status", label: "Status" },
            { name: "description", label: "Description" },
            { name: "category", label: "Category" },
            { name: "price", label: "Price", type: "number" },
            { name: "product_type", label: "Product Type" },
            { name: "features", label: "Features (comma separated)" },
            
          ].map(({ name, label, type = "text" }) => (
            <div key={name} className="col-span-1">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={product[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
                placeholder={`Enter ${label.toLowerCase()}`}
                required
              />
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 transition font-semibold"
            >
              Submit Product
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
