import React, { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, HStack, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const { state } = useLocation();
  const carId = state?.carId;
  const totalAmount = state?.totalAmount;

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-to-cart",
        data: { carId: carId }
      });
      toast.success('Product added to cart');
      navigate('/user/cart', { state: { carId, totalAmount } });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error adding product to cart');
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/user/getcarbyid/${carId}`);
        setCar(response.data.data); // Adjust based on the actual structure of the response
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

  return (
    <Box p={[3, 5]} maxWidth="1200px" mx="auto">
      <HStack spacing={[5, 10]} mt={[5, 10]} align="start" flexDirection={['column', 'row']}>
        {car && (
          <>
            <Image src={car.carPicture} alt="Car Image" boxSize={['150px', '300px']} />
            <VStack spacing={[2, 4]} align="start" width="full">
              <Text fontSize={['xl', '2xl']} fontWeight="bold">{car.carName}</Text>
              <SimpleGrid columns={[1, 2]} spacing={[5, 10]} width="full">
                <GridItem>
                  <Text>Car Model: {car.carModel}</Text>
                  <Text>Car Company: {car.carCompany}</Text>
                  <Text>Car Engine: {car.carEngine}</Text>
                </GridItem>
                <GridItem>
                  <Text>Car Fuel Type: {car.carFuelType}</Text>
                  <Text>Car Mileage: {car.carMileage}</Text>
                  <Text>Seat Capacity: {car.carSeatCapacity}</Text>
                  <Text>Office ID: {car.office}</Text>
                </GridItem>
              </SimpleGrid>
              <Text>Total Price: ${totalAmount}</Text>
              <Button onClick={handleAddToCart} colorScheme="teal" size="md">Add to Cart</Button>
            </VStack>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default OrderPage;
