import {React,useEffect} from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectRouter = () => {
    const userAutherized = useSelector((state) => state.user.userAutherized);

    console.log('userAuthorized======', userAutherized);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userAutherized) {
            navigate("user/signin");
        }
    }, [userAutherized, navigate]);

   return userAutherized && <Outlet />;
};
