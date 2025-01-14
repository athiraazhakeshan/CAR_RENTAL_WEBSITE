
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from "../../redux/features/userSlice";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import {  Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import "./adminprofile.css"

export const AdminProfile = () => {
    // State to store user profile, loading state, and error message
    const [userProfile, setUserProfile] = useState({
       
        email: '',
        role: '',
        address: '',
        contactNumber: '',
        profilePicture: '',
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
    

    const handleUpdate = () => {
        navigate(`/admin/update/${userProfile._id}`); // Navigating to UpdateUser page
    };
  
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
            navigate("/admin/adminlogin");
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
    const { email,profilePicture,address, contactNumber,role } = userProfile;

    // Render the profile data
    return (
       
                <Box p={5}>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                p="6"
                maxW="500px"
                mx="auto"
                boxShadow="lg"
                borderWidth="1px"
                borderRadius="lg"
                bg="gray.50"
            >
                
                <Box flex="1" p="4" textAlign="center">
                                   {profilePicture && (
                                       <Image
                                           src={profilePicture}
                                           // alt={`${firstName} ${lastName}'s profile`}
                                           borderRadius="full"
                                           boxSize="150px"
                                           mb="4"
                                           mx="auto"
                                       />
                                   )}
                    <Heading as="h3" size="lg" mb="3" color="gray.700">
                       Hello! Admin
                    </Heading>
                   <Text fontSize="md" mb="2" color="gray.600">
                        <strong>Email:</strong> {email}
                     </Text>
                     <Text fontSize="md" mb="2" color="gray.600">
                        <strong>Address:</strong> {address}
                     </Text>
                     <Text fontSize="md" mb="2" color="gray.600">
                        <strong>contactNumber:</strong> {contactNumber}
                     </Text>
                     <Text fontSize="md" mb="2" color="gray.600">
                        <strong>roll:</strong> {role}
                     </Text>
                    <VStack spacing="4" mt="4">
                       
                        <Button onClick={handleLogout} colorScheme="red" width="30%">
                            Logout
                        </Button>
                         <Button onClick={handleUpdate} colorScheme="blue" width="30%">
                                                    Edit 
                                                </Button>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};
