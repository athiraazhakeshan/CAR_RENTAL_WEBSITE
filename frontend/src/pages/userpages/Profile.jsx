import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from "../../redux/features/userSlice";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import {  Button } from '@chakra-ui/react';
import "./profile.css"; // Ensure the path is correct

export const Profile = () => {
    // State to store user profile, loading state, and error message
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
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
                const response = await axiosInstance.get('/user/profile');
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
    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/signin');
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
