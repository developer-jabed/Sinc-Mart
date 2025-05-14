import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import gsap from "gsap";

const Statistics = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  // GSAP animation on mount
  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const rawData = res.data;

        // Group by category and sum purchase_count
        const categoryMap = {};
        rawData.forEach((product) => {
          const cat = product.category || "Unknown";
          if (!categoryMap[cat]) {
            categoryMap[cat] = 0;
          }
          categoryMap[cat] += product.purchase_count || 0;
        });

        // Convert to array for chart
        const processedData = Object.keys(categoryMap).map((key) => ({
          category: key,
          purchases: categoryMap[key],
        }));

        setChartData(processedData);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        ref={chartRef}
        className="w-full max-w-6xl h-[500px] bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-700">
          Category-wise Purchase Chart
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="category" />
            <Tooltip />
            <Bar dataKey="purchases" fill="#6366f1" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Statistics;
