import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Heading } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';

const UserOrders = () => {
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const res = await axiosInstance.get(`/order/getuserorders/${userId}`);
                if (res.data && Array.isArray(res.data.orders)) {
                    setOrders(res.data.orders);
                } else {
                    setError("Unexpected response format");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        getUserOrders();
    }, [userId]);

    if (loading) {
        return (
            <Box p={5} textAlign="center">
                <Spinner size="lg" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={5} textAlign="center">
                <Heading size="md" color="red.500">
                    {error}
                </Heading>
            </Box>
        );
    }

    return (
        <Box p={5}>
            <Box
                overflowX="auto"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                p={3}
                shadow="sm"
            >
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>User ID</Th>
                            <Th>Total Price</Th>
                            <Th>Order Status</Th>
                            <Th>Picked At</Th>
                            <Th>Returned At</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <Tr key={order._id} _hover={{ bg: "gray.100" }} style={{ cursor: 'pointer' }}>
                                    <Td>{order._id}</Td>
                                    <Td>{order.userId}</Td>
                                    <Td>{order.totalPrice}</Td>
                                    <Td>{order.orderStatus}</Td>
                                    <Td>{order.pickedAt || 'N/A'}</Td>
                                    <Td>{order.returnedAt || 'N/A'}</Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={6} textAlign="center">
                                    No orders available
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default UserOrders;
