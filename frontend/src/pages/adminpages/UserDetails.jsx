// UserDetails.jsx
import React from 'react';
import { Box, Flex, Heading, Image, Text, Button, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axiosInstance.get('/admin/getAllUsers');
                const data = await response.data;
                console.log(data);
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getAllUsers();
    }, [userId]);

    const user = users.find(c => c._id === userId);
    console.log(user);

    if (!user) {
        return <Box p={5}>User not found</Box>;
    }

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/admin/deleteuser/${userId}`);
            console.log(response);
            if (response.data.success === true) {
                alert("Deleted successfully");
                navigate("/users");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOrders = () => {
        navigate(`/orders/${userId}`);
    };

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
            <Box flex="1" p="4">
                <Heading as="h3" size="lg" mb="3" color="gray.700">
                    {user.firstName} {user.lastName}
                </Heading>
                <Text fontSize="md" mb="2" color="gray.600">
                    <strong>Email:</strong> {user.email}
                </Text>
                <Text fontSize="md" mb="2" color="gray.600">
                    <strong>Address:</strong> {user.address}
                </Text>
                <Text fontSize="md" mb="2" color="gray.600">
                    <strong>Country:</strong> {user.country}
                </Text>
                <Text fontSize="md" mb="2" color="gray.600">
                    <strong>State:</strong> {user.state}
                </Text>
                <Text fontSize="md" mb="2" color="gray.600">
                    <strong>City:</strong> {user.city}
                </Text>
                <VStack spacing="4" mt="4">
                    <Button onClick={handleOrders} colorScheme="blue" width="30%">
                        View Orders
                    </Button>
                    <Button onClick={handleDelete} colorScheme="red" width="30%">
                        Delete
                    </Button>
                </VStack>
            </Box>
        </Flex>
    </Box>
    
    );
};

export default UserDetails;
