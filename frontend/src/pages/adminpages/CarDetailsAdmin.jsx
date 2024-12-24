import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Heading, Flex, Button, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const CarDetailsAdmin = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const [error, setError] = useState(null); // Error state to handle any API issues

  const { carId } = useParams(); // Get the carId from the URL

  useEffect(() => {
    const getCarDetails = async () => {
        try {
          // Fetch details of the specific car
          const res = await axiosInstance.get("/user/getcars");
          console.log(res.data); // Debug response structure
          if (Array.isArray(res.data)) {
            setCars(res.data); // If the response is an array, set the entire array
          } else {
            setCars([res.data]); // If the response is an object, wrap it in an array
          }
        } catch (error) {
          console.log(error);
          setError("Failed to fetch car details");
        } finally {
          setLoading(false);
        }
      };
      
      
    getCarDetails();
  }, [carId]);

  // If data is still loading, show a spinner
  if (loading) {
    return <Box p={5}><Spinner size="xl" /></Box>;
  }

  // If there was an error fetching the data, show an error message
  if (error) {
    return <Box p={5}><Text color="red.500">{error}</Text></Box>;
  }

  // If no car is found with the given ID, show a message
  const car = cars[0]; // Since we're now storing the car as an array
  if (!car) {
    return <Text>Car not found</Text>;
  }

  const handleUpdate = () => {
    navigate(`/admin/updatecar/${carId}`);
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/admin/deletecar/${carId}`);
      if (res.data === "deleted car") {
        alert("Deleted successfully");
        navigate("/admin/carlist");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete the car");
    }
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} p="4" maxW="1200px" mx="auto">
      <Box flex="1">
        <Image src={car.carPicture} alt={car.carName} objectFit="cover" w="100%" h={{ base: '300px', md: '500px' }} />
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
        <Flex mt="4">
          <Button colorScheme="blue" mr="4" onClick={handleUpdate}>Update</Button>
          <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CarDetailsAdmin;
