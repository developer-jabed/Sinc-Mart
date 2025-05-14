import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Provider/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <div className="absolute text-sm font-semibold text-blue-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location?.pathname} />;
};

export default PrivateRoute;