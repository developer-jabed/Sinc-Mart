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


const Route = createBrowserRouter([
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
        element: <Category></Category>
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
        path:"cart",
        element:(
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ) 
      },
      {
        path: "orders",
        element:(
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        )
      },
      {
        path:"add-product",
        element:(
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        )
      }
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
