


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Text, Heading, Flex, Button } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';

const CarDetailsHero = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const { carId } = useParams();

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const response = await axiosInstance.get('user/getcars');
        setCars(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCars();
  }, []);

  const car = cars.find(c => c.id === carId);

  if (!car) {
    return <Text>Car not found</Text>;
  }

  const handleNext = () => {
    const token = localStorage.getItem('token');
    console.log('Retrieved Token:', token); // Debugging: Check the token value

    if (!token) {
      alert("Need to login first");
      navigate('/user/signin');
      return;
    }
    navigate(`/user/carorder1/${carId}`, { state: { rentalPriceCharge: car.rentalPriceCharge, carPicture: car.carPicture } });
  }

  return (
    <Box bg="gray.100" color="black">
      <Flex direction={{ base: 'column', md: 'row' }} p="4" maxW="1200px" mx="auto">
        <Box flex="1">
          <Image src={car.carPicture} alt={car.name} objectFit="cover" w="100%" h={{ base: '300px', md: '500px' }} />
        </Box>
        <Box flex="1" p="4">
          <Heading as="h1" mb="4">{car.carName}</Heading>
          <Text fontSize="lg" mb="4" fontWeight="bold">Model: {car.carModel}</Text>
          <Text fontSize="lg" mb="4" fontWeight="bold">Company: {car.carCompany}</Text>
          <Text fontSize="lg" mb="4" fontWeight="bold">Category: {car.carCategory}</Text>
          <Text fontSize="lg" mb="4" fontWeight="bold">Engine: {car.carEngine}</Text>
          <Text fontSize="lg" mb="4" fontWeight="bold">Transmission: {car.transmission}</Text>
          <Text fontSize="lg" mb="4" fontWeight="bold">Mileage: {car.carMileage}</Text>
          <Text fontSize="lg" mb="4" fontWeight="bold">Fuel Type: {car.carFuelType}</Text>
          <Text fontSize="lg" fontWeight="bold">Rent: ${car.rentalPriceCharge}/day</Text>
          <Flex mt="4" justifyContent="flex-end">
            <Button colorScheme="red" onClick={handleNext}>Next</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CarDetailsHero;
