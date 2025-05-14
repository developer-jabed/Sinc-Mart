import React, { useEffect, useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import AuthContext from "../../Provider/AuthContext/AuthContext";

const ManageUsers = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeRole = async (id, role) => {
    const result = await Swal.fire({
      title: `Are you sure you want to make this user a ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setLoadingIds((prev) => [...prev, id]);

      const res = await fetch(`http://localhost:5000/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        Swal.fire({
          title: "Role Updated",
          text: `The user has been successfully made a ${role}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
        await fetchUsers();
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an error updating the role.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      setLoadingIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) => user.email !== currentUser?.email
  );

  return (
    <motion.div
      className="mt-20 p-4 min-h-screen bg-gradient-to-br from-sky-100 via-white to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center text-gray-800 mb-10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        👥 Manage Users
      </motion.h2>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto max-w-7xl mx-auto rounded-lg shadow-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.displayName || user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-700 capitalize">
                  {user.role || "user"}
                </td>
                <td className="px-6 py-4 space-x-3">
              
                  <button
                    onClick={() => handleMakeRole(user._id, "admin")}
                    disabled={loadingIds.includes(user._id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      loadingIds.includes(user._id)
                        ? "bg-indigo-300 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    Make Admin
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Card View */}
      <div className="lg:hidden grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white shadow-md rounded-xl p-4 space-y-2"
          >
            <div className="text-lg font-semibold text-gray-800">
              {user.displayName || user.name}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div className="text-sm text-gray-500 capitalize">
              <span className="font-medium">Role:</span> {user.role || "user"}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
            
              <button
                onClick={() => handleMakeRole(user._id, "admin")}
                disabled={loadingIds.includes(user._id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  loadingIds.includes(user._id)
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Make Admin
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ManageUsers;
