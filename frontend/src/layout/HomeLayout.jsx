import React, { useEffect } from "react";
//import {  Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Outlet,useNavigate,useLocation } from 'react-router-dom'
import { UserHeader } from "../pages/userpages/UserHeader";

import { axiosInstance } from "../config/axiosInstance";
//import { ProtectRoute } from "../router/ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { Header } from "../components/Header";
import UserTopbar from "./UserTopbar";



export const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userAutherized } = useSelector((state) => state.user);

    const checkUser = async () => {
      try {
        const response = await axiosInstance({ method: "GET", url: "/user/checkuser" });
        console.log(response, "====response");
        dispatch(saveUser(response?.data?.data));
      } catch (error) {
        console.log(error?.response?.data, "===error");
        dispatch(clearUser());
      }
    };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);
  

  return (
    
    <div className='text-black'> 
    {/* <TopBar/> */}
   <UserTopbar/>
    <nav>
    {userAutherized ? <UserHeader/>:  <Header /> } 
    {/* <Header/> */}
  
    </nav>
     
      
      <div className='min-h-96'>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

