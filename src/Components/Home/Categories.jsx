import { useEffect, useState } from "react";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    fetch("")
    .then((res) => res.json())
    .then((data) => setCategories(data))
  },[])
  return (
    <div className="bg-gray-100 py-14 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded shadow hover:bg-blue-100 transition duration-300 font-medium text-blue-800"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
