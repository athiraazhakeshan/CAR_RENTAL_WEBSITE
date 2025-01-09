import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

export const UpdateUser = () => {
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        contactNumber: '',
        countryCode: '',
        pin: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const toast = useToast(); // Initialize Chakra UI toast

    const { id } = useParams(); // Accessing the route parameter

    // Fetch user data for the given ID
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/user/profile`);
                setUserProfile(response.data.userData);
            } catch (err) {
                setError(err);
            }
        };

        fetchProfile();
    }, [id]); // Dependency array with id to re-run when id changes

    const handleUpdate = async () => {
        try {
            const response = await axiosInstance.patch(`/user/updateuser/${id}`, userProfile);
            console.log('Update successful:', response.data);

            // Display toast
            toast({
                title: "User Updated.",
                description: "Your profile has been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Navigate back to the Profile page
            navigate(`/user/profile`);
        } catch (error) {
            console.error("Error updating user:", error);
            toast({
                title: "Error",
                description: "Failed to update user. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevState => ({ ...prevState, [name]: value }));
    };

    if (error) {
        return <div>Error loading profile: {error.message}</div>;
    }

    return (
        <Box p={5}>
            <FormControl mb="4">
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" value={userProfile.firstName} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" value={userProfile.lastName} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input name="email" value={userProfile.email} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Address</FormLabel>
                <Input name="address" value={userProfile.address} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Country</FormLabel>
                <Input name="country" value={userProfile.country} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>State</FormLabel>
                <Input name="state" value={userProfile.state} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>City</FormLabel>
                <Input name="city" value={userProfile.city} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Contact Number</FormLabel>
                <Input name="contactNumber" value={userProfile.contactNumber} onChange={handleChange} />
            </FormControl>

            <Button onClick={handleUpdate} colorScheme="blue" width="30%">
                Update User
            </Button>
        </Box>
    );
};
