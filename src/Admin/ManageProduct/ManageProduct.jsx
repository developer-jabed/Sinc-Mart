import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    // Fetch products from the API with pagination
    axios
      .get(
        `http://localhost:5000/products/page?page=${page}&limit=${productsPerPage}`
      )
      .then((response) => {
        setProducts(response.data.products || []);
        setTotalPages(Math.ceil(response.data.total / productsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  }, [page]);

  // Handle delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/products/${id}`)
          .then(() => {
            setProducts(products.filter((product) => product._id !== id));

            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting the product", error);
            Swal.fire("Error!", "Failed to delete product.", "error");
          });
      }
    });
  };

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Manage Products
      </motion.h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="spinner-border animate-spin border-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <motion.tr
                    key={product._id}
                    className="border-b product-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td className="px-4 py-2">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Fancy Pagination */}
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName={"pagination-container"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active"}
          disabledClassName={"disabled"}
        />
      </motion.div>
    </div>
  );
};

export default ManageProduct;
