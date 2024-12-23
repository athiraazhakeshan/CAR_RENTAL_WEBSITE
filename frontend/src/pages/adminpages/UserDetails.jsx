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
            <Flex direction={{ base: 'column', md: 'row' }} p="3" maxW="800px" mx="auto" mb="4" boxShadow="md" borderWidth="1px" borderRadius="md" bg="white">
                <Box flex="1">
                    <Image src={user.image} alt={user.name} objectFit="cover" w="100%" h="auto" borderRadius="md" />
                </Box>
                <Box flex="1" p="3">
                    <Heading as="h3" size="md" mb="3">{user.firstName}</Heading>
                    <Text fontSize="md" mb="3">Email: {user.email}</Text>
                    {/* <Text fontSize="md" mb="3">Phone: {user.contactNumber}</Text> */}
                    <Text fontSize="md">{user.details}</Text>
                    <VStack spacing="2" mt="3">
                        {user.role !== 'admin' && (
                            <Button onClick={handleOrders} colorScheme="blue">View Orders</Button>
                        )}
                        <Button onClick={handleDelete} colorScheme="red">Delete</Button>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default UserDetails;
