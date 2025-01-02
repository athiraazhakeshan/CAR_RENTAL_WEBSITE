import React, { useEffect, useState } from 'react';
import { Box, Table, Spinner, Heading, Tbody, Tr, Td } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance';

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axiosInstance.get("/order/getorder");
        console.log("API Response:", res); // Log the full response object to understand its structure

        if (res && res.data && Array.isArray(res.data.data)) {
          setOrders(res.data.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    getAllOrders();
  }, []);

//   const handleRowClick = (orderId) => {
//     console.log("Navigating to:", `${location.pathname}/${orderId}`); // Log to check if the path is correct
//     navigate(`${location.pathname}/${orderId}`);
//     console.log("Location Pathname:", location.pathname); // Check what this outputs
//   };

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
            orders.map((order, index) => (
              order._id ? (
                <Tr key={order._id} onClick={() => handleRowClick(order._id)} style={{ cursor: 'pointer' }}>
                  <Td>Order ID: {order._id}</Td>
                  <Td>User ID: {order.userId}</Td>
                  <Td>Total Price: {order.totalPrice}</Td>
                  <Td>Order Status: {order.orderStatus}</Td>
                  <Td>Picked At: {order.pickedAt}</Td>
                  <Td>Returned At: {order.returnedAt}</Td>
                </Tr>
              ) : (
                <Tr key={index}>
                  <Td colSpan={6} color="red.500">Error: Invalid order data</Td>
                </Tr>
              )
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

export default OrderList;
