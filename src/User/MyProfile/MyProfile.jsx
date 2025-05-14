import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../../Provider/AuthContext/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      // Simulating fetch - you can replace with actual API call
      setProfile({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || "https://i.ibb.co/MBtjqXQ/avatar.png",
        role: "User",
        joined: "May 2024",
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <AnimatePresence>
        {profile ? (
          <motion.div
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={profile.photoURL}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto shadow-md mb-4 border-4 border-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />

            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-800"
              whileHover={{ scale: 1.03 }}
            >
              {profile.displayName}
            </motion.h2>

            <p className="text-gray-500 text-sm sm:text-base mt-1">
              {profile.email}
            </p>

            <div className="mt-6 space-y-2">
              <p className="text-base text-gray-600">
                <span className="font-medium">Role:</span> {profile.role}
              </p>
              <p className="text-base text-gray-600">
                <span className="font-medium">Joined:</span> {profile.joined}
              </p>
            </div>

            <motion.button
              className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 text-sm sm:text-base"
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </motion.div>
        ) : (
          <p className="text-xl text-gray-700">Loading profile...</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyProfile;
