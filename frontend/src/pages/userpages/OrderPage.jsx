import React, { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, HStack, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../components/context/SearchContext';
import { axiosInstance } from '../../config/axiosInstance';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const { state } = useLocation();
  const carId = state?.carId;
  const totalAmount = state?.totalAmount;

  const { searchData } = useSearch();
  const { pickupDate, returnDate } = searchData;

  // Retrieve user and token from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/user/getcarbyid/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    if (carId) {
      fetchCar();
    }
  }, [carId]);

  if (!car) {
    return <Text>Loading...</Text>;
  }

  const handleOrder = async () => {
    if (!token) {
      alert("Need to login first");
      navigate('/user/signin');
      return;
    }
    try {
      const orderData = {
        carId: car[0]._id,
        totalAmount,
        userId: user.id,
        officeLocationId: car[0].office,
        pickedat: pickupDate,
        returnedat: returnDate,
      };

      const response = await axiosInstance.post('user/createorder', orderData);
      const { order, razorpayOrder } = response.data;

      const options = {
        key: 'rzp_test_Z7ni2qIKcSqKiS',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Car Rental",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyResponse = await axiosInstance.post('user/verify-payment', data);

            if (verifyResponse.data.success) {
              navigate("/success", {
                state: {
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                },
              });
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error('Error verifying payment:', error.response?.data || error.message);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact || '9539441813',
        },
        notes: {
          address: "Car Rental Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
    }
  };

  return (
    <Box p={[3, 5]} maxWidth="1200px" mx="auto">
      <HStack spacing={[5, 10]} mt={[5, 10]} align="start" flexDirection={['column', 'row']}>
        {car[0] && (
          <>
            <Image src={car[0].carPicture} alt="Car Image" boxSize={['150px', '300px']} />
            <VStack spacing={[2, 4]} align="start" width="full">
              <Text fontSize={['xl', '2xl']} fontWeight="bold">{car[0].carName}</Text>
              <SimpleGrid columns={[1, 2]} spacing={[5, 10]} width="full">
                <GridItem>
                  <Text>Car Model: {car[0].carModel}</Text>
                  <Text>Car Company: {car[0].carCompany}</Text>
                  <Text>Car Engine: {car[0].carEngine}</Text>
                </GridItem>
                <GridItem>
                  <Text>Car Fuel Type: {car[0].carFuelType}</Text>
                  <Text>Car Mileage: {car[0].carMileage}</Text>
                  <Text>Seat Capacity: {car[0].carSeatCapacity}</Text>
                  <Text>Office ID: {car[0].office}</Text>
                </GridItem>
              </SimpleGrid>
              <Text>Total Price: ${totalAmount}</Text>
              <Button onClick={handleOrder} colorScheme="teal" size="md">Place Order</Button>
            </VStack>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default OrderPage;
