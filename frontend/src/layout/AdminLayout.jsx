import React, { useEffect } from "react";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/adminSlice";
import { AdminHeader } from "../pages/adminpages/AdminHeader.jsx"
import TopBar from "../components/TopBar.jsx";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userAutherized } = useSelector((state) => state.admin); // Corrected spelling here

  const checkUser = async () => {
    try {
      const response = await axiosInstance({ method: "GET", url: "/admin/checkadmin" });
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
      <TopBar />
      <nav>
        {userAutherized ? <AdminHeader /> : <Header />} {/* Corrected spelling here */}
      </nav>
      <div className='min-h-96'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
