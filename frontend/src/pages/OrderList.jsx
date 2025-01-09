import React, { useEffect, useState } from 'react';
import { Box, Table, Spinner, Heading, Tbody, Tr, Td, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance';

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axiosInstance.get("/order/getorder");
        console.log("API Response:", res);

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

  // const handleRowClick = (orderId) => {
  //   navigate(`${location.pathname}/${orderId}`);
  // };

  // if (loading) {
  //   return <Box p={5}><Spinner /></Box>;
  // }

  // if (error) {
  //   return <Box p={5}><Heading size="md" color="red.500">{error}</Heading></Box>;
  // }

  return (
    <Box p={5}>
      {isMobile ? (
        // Mobile View: Stacked Order Cards
        <Box>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Box
                key={order._id}
                p={4}
                borderWidth={1}
                borderRadius="lg"
                mb={4}
                // onClick={() => handleRowClick(order._id)}
                // cursor="pointer"
                // _hover={{ bg: "gray.100" }}
              >
                <Heading size="sm">Order ID: {order._id}</Heading>
                <Box mt={2}>User ID: {order.userId}</Box>
                <Box>Total Price: {order.totalPrice}</Box>
                <Box>Order Status: {order.orderStatus}</Box>
                <Box>Picked At: {order.pickedAt}</Box>
                <Box>Returned At: {order.returnedAt}</Box>
              </Box>
            ))
          ) : (
            <Box>No orders available</Box>
          )}
        </Box>
      ) : (
        // Desktop View: Standard Table
        <Table variant="simple">
          <Tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Tr
                  key={order._id}
                  // onClick={() => handleRowClick(order._id)}
                  // cursor="pointer"
                  // _hover={{ bg: "gray.100" }}
                >
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
      )}
    </Box>
  );
};

export default OrderList;
