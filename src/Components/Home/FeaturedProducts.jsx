import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Products") 
      .then((res) => res.json())
      .then((data) => {
        const topProducts = data
          .sort((a, b) => b.purchase_count - a.purchase_count)
          .slice(0, 7);
        setProducts(topProducts);
      });
  }, []);

  const settings = {
    dots: true, // bullet navigation
    arrows: true, // optional: previous/next buttons
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-14 px-6 text-center bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 className="text-4xl font-extrabold mb-10 text-indigo-600 drop-shadow-md">
        🌟 Best Selling Products
      </h2>

      <Slider {...settings}>
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="px-3"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          >
            <Link to={`/product/${product.id}`}>
              <div className="bg-white border rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col items-center">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-1">${product.price}</p>
                <p className="text-green-500 text-sm">{product.availability}</p>
                <span className="text-xs text-blue-500">
                  🔥 Sold: {product.purchase_count}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
