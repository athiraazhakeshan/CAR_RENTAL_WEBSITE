import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Heading, Text, Divider, VStack } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';

const OrderDetails = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axiosInstance.get(`/admin/getorder/${userId}`);
        const data = response.data;

        console.log('API response success:', data.success); // Log success field
        console.log('API response orders:', data.orders);   // Log orders field

        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error('Received data is not an array:', data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    getOrders();
  }, [userId]);

  return (
    <Box p={5}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Box key={order._id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <Heading size="md" mb={2}>Invoice</Heading>
            <Divider mb={4} />
            <VStack align="start" spacing={2}>
              <Text><strong>ID:</strong> {order._id}</Text>
              <Text><strong>Name:</strong> {order.user.firstName}</Text>
              <Text><strong>Car Name:</strong> {order.car.carName}</Text>
              <Text><strong>Picking date:</strong> {order.pickedAt}</Text>
              <Text><strong>Returning date:</strong> {order.returnedAt}</Text>
              <Text><strong>Total price:</strong> {order.totalPrice}</Text>
            </VStack>
          </Box>
        ))
      ) : (
        <Text>No orders available</Text>
      )}
    </Box>
  );
};

export default OrderDetails;
