
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import { Box, Button, FormControl, FormLabel, Input, useToast, Image } from "@chakra-ui/react";

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
        profilePicture: '', // To store the profile picture URL
    });

    const [profilePictureFile, setProfilePictureFile] = useState(null); // State for uploaded file
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();

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
    }, [id]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            
            // Append updated fields to formData
            formData.append('firstName', userProfile.firstName);
            formData.append('lastName', userProfile.lastName);
            formData.append('email', userProfile.email);
            formData.append('address', userProfile.address);
            formData.append('city', userProfile.city);
            formData.append('state', userProfile.state);
            formData.append('country', userProfile.country);
            formData.append('contactNumber', userProfile.contactNumber);

            // Append the profile picture file if a new one is selected
            if (profilePictureFile) {
                formData.append('profilePicture', profilePictureFile);
            }

            const response = await axiosInstance.patch(`/user/updateuser/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast({
                title: "User Updated.",
                description: "Your profile has been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

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

    const handleFileChange = (e) => {
        setProfilePictureFile(e.target.files[0]);
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
                <FormLabel>City</FormLabel>
                <Input name="city" value={userProfile.city} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>State</FormLabel>
                <Input name="state" value={userProfile.state} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Country</FormLabel>
                <Input name="country" value={userProfile.country} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Contact Number</FormLabel>
                <Input name="contactNumber" value={userProfile.contactNumber} onChange={handleChange} />
            </FormControl>

            <FormControl mb="4">
                <FormLabel>Profile Picture</FormLabel>
                {userProfile.profilePicture && (
                    <Image
                        src={userProfile.profilePicture}
                        alt="Current Profile Picture"
                        boxSize="150px"
                        borderRadius="full"
                        mb="4"
                    />
                )}
                <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>

            <Button onClick={handleUpdate} colorScheme="blue" width="30%">
                Update User
            </Button>
        </Box>
    );
};
