
import {createBrowserRouter} from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../pages/userpages/Home";
import { Contact } from "../pages/userpages/Contact";
import { Car } from "../pages/userpages/Car";
import { CarDetails } from "../pages/userpages/CarDetails";


export const router = createBrowserRouter([
    {
      path: "/",
      element:<HomeLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"home",
          element:<Home  />
        },
        {
          path:"contact",
          element:<Contact  />
        },
        {
          path:"car",
          element:<Car  />
        },
        {
          path:"car-details/:id",
          element:<CarDetails  />
        },
      ]
    },
  ]);
  