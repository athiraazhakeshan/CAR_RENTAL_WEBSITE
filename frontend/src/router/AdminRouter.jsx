import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const AdminRouter = () => {
    const userAutherized = useSelector((state)=>state.admin.userAutherized)

    console.log('userAutherized======',userAutherized);
    
    const navigate = useNavigate();

    // useEffect(() => {
        if (!userAutherized) {
            navigate("adminlogin");
        }
    // }, []);

    return userAutherized && <Outlet />;
};
