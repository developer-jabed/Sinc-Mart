import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../Provider/AuthContext/AuthContext";

const MyProduct = () => {
  const { user } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/Products/all");
        const data = await res.json();
        const filteredProducts = Array.isArray(data)
          ? data.filter((product) => product.ownerEmail === user?.email)
          : [];
        setMyProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to fetch user's products", error);
        setMyProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyProducts();
    }
  }, [user?.email]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : myProducts.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md p-4 rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <a
                href={product.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                Visit Link
              </a>
              <p className="text-sm mt-1 text-gray-400">
                Status: {product.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
