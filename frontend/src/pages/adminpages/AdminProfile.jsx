import React from "react";
import { useDispatch} from 'react-redux';
import { clearUser } from "../../redux/features/userSlice";
import { useNavigate } from 'react-router-dom';
//import { axiosInstance } from "../../config/axiosInstance";
import {  Button } from '@chakra-ui/react';
 // Ensure the path is correct

export const AdminProfile = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
// Empty dependency array means this runs once on mount

    // Handle logout
    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/admin/adminlogin');
    };

  
    // Render the profile data
    return (
        <div className="profile">
            <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Welcome! Admin </h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                            aut repudiandae et a id nisi.
                        </p>
                    </div>
             <Button onClick={handleLogout} size="sm" colorScheme="red">Logout</Button>
        </div>
    );
};
