// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const testimonials = [
  { name: "John Doe", review: "Best online shopping experience!", rating: 5 },
  {
    name: "Jane Smith",
    review: "Fast delivery and quality products.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="py-14 px-6 bg-blue-50 text-center">
      <h2 className="text-3xl font-bold mb-8 text-blue-800">
        What Customers Say
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 rounded shadow"
          >
            <p className="italic">"{t.review}"</p>
            <h4 className="mt-4 font-semibold">{t.name}</h4>
            <p className="text-yellow-500">{"⭐".repeat(t.rating)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
