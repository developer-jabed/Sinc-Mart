import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Components/Home/Home";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import Products from "../Components/Products/Products";
import PrivateRoute from "./PrivateRoute";
import Details from "../Private/Details/Details";
import Category from "../Category/Category";
import Cart from "../Components/Cart/Cart";
import Order from "../Order/Order";
import AddProduct from "../AddProduct/AddProduct";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import ManageUsers from "../Admin/Manage-User/ManageUsers";
import Statistics from "../Admin/Statistics/Statistics";
import ManageProduct from "../Admin/ManageProduct/ManageProduct";
import MyProfile from "../User/MyProfile/MyProfile";
import MyProduct from "../User/MyProduct/MyProduct";

const Route = createBrowserRouter([
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
     
      {
        index: true,
        element: <Statistics></Statistics>,
      },

      {
        path: "my-profile",
        element: <MyProfile></MyProfile>
      },
    
      {
        path: "my-products",
        element: <MyProduct />,
      },
      {
        path: "statistics",
        element: <Statistics/>,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path:"manage-product",
        element:<ManageProduct></ManageProduct>
      }
    ],
  },
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "category",
        element: <Category></Category>,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
]);
export default Route;
