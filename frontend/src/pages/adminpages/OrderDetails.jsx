import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Table, Tbody, Tr, Td, Spinner, Heading } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';

const UserOrders = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
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
        return <Box p={5}><Spinner /></Box>;
    }

    if (error) {
        return <Box p={5}><Heading size="md" color="red.500">{error}</Heading></Box>;
    }

    return (
        <Box p={5}>
            <Table variant="simple">
                <Tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <Tr key={order._id} style={{ cursor: 'pointer' }}>
                                <Td>Order ID: {order._id}</Td>
                                <Td>User ID: {order.userId}</Td>
                                <Td>Total Price: {order.totalPrice}</Td>
                                <Td>Order Status: {order.orderStatus}</Td>
                                <Td>Picked At: {order.pickedAt}</Td>
                                <Td>Returned At: {order.returnedAt}</Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={6}>No orders available</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UserOrders;
