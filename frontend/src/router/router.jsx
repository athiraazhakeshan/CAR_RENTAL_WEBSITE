import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../pages/userpages/Home";
import { Car } from "../pages/userpages/Car";
import { SignUp } from "../components/shared/SignUp";
import { SignIn } from "../components/shared/SignIn";
import { AdminSignin } from "../components/shared/AdminSignin";
import { ProtectRouter } from "./ProtectRouter";
import { AdminRouter } from "./AdminRouter";
import About from "../pages/userpages/About";
import { Layout } from "../layout/Layout";
import { Profile } from "../pages/userpages/Profile";
import Hero1 from "../components/Hero1";
import CarDetails from "../pages/userpages/CarDetails";
import CarOrderPage1 from "../pages/userpages/CarOrderPage1";
import AdditionalRequirementsPage from "../pages/userpages/AdditionalRequirementPage";
import Users from "../pages/adminpages/Users.jsx";
import UserDetails from "../pages/adminpages/UserDetails.jsx";
import { AdminProfile } from "../pages/adminpages/AdminProfile.jsx";
import OrderDetails from "../pages/adminpages/OrderDetails.jsx";
import OrderPage from "../pages/userpages/OrderPage.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "cars",
          element: <Hero1 />,
        },
        {
          path: "cars/:carId",
          element: <CarDetails />,
        },
        {
          path: '/user/carorder1/:carId',
          element: <CarOrderPage1/>,
        },
        {
          path: '/user/order/requirements',
          element: <AdditionalRequirementsPage/>         
          
        },  
        {
          path: '/user/orderpage',
          element: <OrderPage/>,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "booking",
          element: <Home />,
        },
        {
          path: "user",
          element: <ProtectRouter />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "booking",
              element: <Home />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "home",
          element: <AdminLayout />,
        },
        {
          path:"users/:userId",
          element:<UserDetails/>
        },
        {
          path: "users",
          element: <Users/>,
        },
        {
          path: "orders/:userId",
          element: <OrderDetails/>,
        },
      
        {
          path: "/admin",
          element: <AdminRouter />,
          children: [
            {
              path: "adminlogin",
              element: <AdminSignin role="admin"/>,
            },
           
            {
              path: "profile",
              element: <AdminProfile/>,
            },
           
            {
              path: "office",
              element: <h2>Office Management</h2>,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);
