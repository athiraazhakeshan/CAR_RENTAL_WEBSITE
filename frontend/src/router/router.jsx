import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../pages/userpages/Home";
import {Car}  from "../pages/userpages/Car.jsx";
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
import AddOffice from "../pages/adminpages/AddOffice.jsx";
import Offices from "../pages/adminpages/Offices.jsx";
import OfficeDtails from "../pages/adminpages/OfficeDetails.jsx";
import UpdateOffice from "../pages/adminpages/UpdateOffice.jsx";
import CarList from "../pages/adminpages/CarList.jsx";
import CarDetailsAdmin from "../pages/adminpages/CarDetailsAdmin.jsx";
import CarByLocation from "../pages/userpages/CarByLocation.jsx";
import AddCar from "../pages/adminpages/AddCar.jsx";
import UpdateCarForm from "../pages/adminpages/UpdateCarForm.jsx";
import Cart from "../pages/userpages/Cart.jsx";
import PaymentSuccess from "../pages/userpages/paymentSuccess.jsx";
import OrderList from "../pages/OrderList.jsx";
import Contact from "../pages/Contact.jsx";
import { Hero } from "../pages/userpages/Hero.jsx";
import CarDetailsHero from "../pages/userpages/carDetailsHero.jsx";
import CarByLocationHero from "../pages/userpages/CarByLocationHero.jsx";
// import Car from "../../../server/models/carModel.js";

// import Hero from "../components/Hero.jsx";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [

        {
          path: "/car",
          element:<Car/>
        },
        {
          path: "/aboutus",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/",
          element: <Hero/>,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "user/signin",
          element: <SignIn />,
        },
        {
          path: "admin/adminlogin",
          element: <AdminSignin role="admin"/>,
        },
        {
          path: "carsbylocations/:city",
          element: <CarByLocationHero/>,
        },
        {
          path: "carr/:carId",
          element: <CarDetailsHero />,
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
          path: "cars",
          element: <Hero1 />,
        },
        {
          path: "cars/:carId",
          element: <CarDetails />,
        },
        {
          path: "/user/carsbylocation/:city",
          element: <CarByLocation/>,
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
          path: "my-order",
          element: <OrderList />,
        },
        {
          path: "booking",
          element: <Home />,
        },
        {
          path: "user/payment/success",
          element:<PaymentSuccess/>
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
            {
              path: "cart",
              element:<Cart/>,
            },
           
            {
              path: "payment/cancel",
              element:<h2></h2>,
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
          path: "admin/addoffice",
          element: <AddOffice/>,
        },
        {
          path:"admin/offices",
          element:<Offices/>
        },
        {
          path:"admin/offices/:officeId",
          element:<OfficeDtails/>
        },
        {
          path:"admin/updateOffice/:officeId",
          element:<UpdateOffice/>
        },
        {
          path:"admin/carlist",
          element:<CarList/>
        },
        {
          path:"/admin/carlist/:carId",
          element:<CarDetailsAdmin/>
        },
        {
          path:"admin/addcar",
          element:<AddCar/>
        },
        {
          path: "/admin/updatecar/:carId",
          element:<UpdateCarForm/>
        },
        // {
        //   path: "homme",
        //   element: <Home />,
        // },
       
      
        {
          path: "/admin",
          element: <AdminRouter />,
          children: [
           
           
            {
              path: "profile",
              element: <AdminProfile/>,
            },
           
            {
              path: "office",
              element: <h2>office</h2>
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
