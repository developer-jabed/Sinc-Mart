import { Outlet } from "react-router";
import Dashboard from "../Main/Dashboard";
import Footer from "../../Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row mb-5 space-x-5 gap-6">
        {/* Sidebar */}
        <div className="w-[250px]  text-white   top-0">
          <Dashboard/>
        </div>

        {/* Main Content */}
        <div className="flex-1 mt-4  bg-gray-100 p-6 ">
          <Outlet />
        </div>

        {/* Footer */}
      </div>
      <div className="w-full bg-gray-800 text-white py-4 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
