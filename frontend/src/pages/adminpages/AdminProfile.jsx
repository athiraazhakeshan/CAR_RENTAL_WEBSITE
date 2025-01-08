// import React from "react";
// import { useDispatch} from 'react-redux';
// import { clearUser } from "../../redux/features/userSlice";
// import { useNavigate } from 'react-router-dom';
// //import { axiosInstance } from "../../config/axiosInstance";
// import {  Button } from '@chakra-ui/react';
//  // Ensure the path is correct

// export const AdminProfile = () => {


//     const dispatch = useDispatch();
//     const navigate = useNavigate();
// // Empty dependency array means this runs once on mount

//     // Handle logout
//     const handleLogout = () => {
//         dispatch(clearUser());
//         navigate('/admin/adminlogin');
//     };

  
//     // Render the profile data
//     return (
//         <div className="profile">
//             <div className="text-center lg:text-left">
//                         <h1 className="text-5xl font-bold">Welcome! Admin </h1>
//                         <p className="py-6">
//                             Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
//                             aut repudiandae et a id nisi.
//                         </p>
//                     </div>
//              <Button onClick={handleLogout} size="sm" colorScheme="red">Logout</Button>
//         </div>
//     );
// };
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from "../../redux/features/userSlice";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import {  Button } from '@chakra-ui/react';
import "./adminprofile.css"

export const Profile = () => {
    // State to store user profile, loading state, and error message
    const [userProfile, setUserProfile] = useState({
       
        email: '',
        role: '',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch profile data when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Use axiosInstance to fetch data
                const response = await axiosInstance.get('/admin/profile');
                console.log('API response:', response.data); // Log the entire response
                setUserProfile(response.data.userData); // Set the state with the nested userData object
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []); // Empty dependency array means this runs once on mount

    // Handle logout
    // const handleLogout = () => {
    //     dispatch(clearUser());
    //     console.log("logout successfully")
    //     navigate('/user/signin');
    // };
    const handleLogout = async () => {
        try {
            // Call backend logout endpoint to clear cookies
            await axiosInstance.post('/admin/adminlogout');
    
            // Clear token from localStorage
            localStorage.removeItem('token');
            sessionStorage.removeItem('token'); // In case you use sessionStorage
    
            // Clear Redux state if applicable
            dispatch(clearUser());
    
            console.log("Logout successful");
            navigate("admin/adminlogin");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Failed to log out. Please try again.");
        }
    };
    
    // If loading, show a loading message
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If there's an error, show the error message
    if (error) {
        return <div>Error loading profile: {error.message}</div>;
    }

    // If no profile data, show a message
    if (!userProfile) {
        return <div>No profile data available.</div>;
    }

    // Destructure the profile data
    const { firstName, lastName, email, address, city, state, country, role } = userProfile;

    // Render the profile data
    return (
        <div className="profile">
            <h1 className="profile-name">Hello! {firstName} {lastName}</h1>
            <p className="profile-email">Mail id: {email}</p>
            <p className="profile-address">Address: {address}, {city}, {state}, {country}</p>
            {/* <p className="profile-contact">Contact Number: {contactNumber}</p> */}
            <p className="profile-role">Role: {role}</p>
             <Button onClick={handleLogout} size="sm" colorScheme="red">Logout</Button>
        </div>
    );
};
