import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Provider/AuthContext/AuthContext";
import AdminDashboard from "../../Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "../../User/UserDashboard/UserDashboard";


const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch('http://localhost:5000/users')
        .then((res) => res.json())
        .then((data) => {
          const foundUser = data.find((userData) => userData.email === user.email);
          if (foundUser) {
            setUserRole(foundUser.role); 
          } else {
            setUserRole(null);
          }
          setRoleLoading(false); 
        })
        .catch((err) => {
          console.error("Failed to fetch role:", err);
          setRoleLoading(false); 
        });
    } else {
      setRoleLoading(false); 
    }
  }, [user, loading]); 

  if (loading || roleLoading)
    return <div className="mt-20 text-4xl">Loading...</div>;

  if (!user)
    return (
      <div className="mt-20 text-4xl text-red-500">User not logged in</div>
    );

  return (
    <div >
      {userRole === "admin" && <AdminDashboard />}
      {userRole === "user" && <UserDashboard/>}

      {!["admin", "moderator", "user"].includes(userRole) && (
        <div className="text-xl text-gray-500">
          No valid role assigned: {userRole}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
