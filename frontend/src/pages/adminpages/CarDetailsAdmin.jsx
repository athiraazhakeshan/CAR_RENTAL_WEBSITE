import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Heading, Flex, Button, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const CarDetailsAdmin = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { carId } = useParams();

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        const res = await axiosInstance.get("/user/getcars");
        if (Array.isArray(res.data.data)) {
          const car = res.data.data.find(car => car._id === carId);
          setCar(car);
        } else {
          setError("Unexpected response format");
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

  if (loading) {
    return <Box p={5}><Spinner size="xl" /></Box>;
  }

  if (error) {
    return <Box p={5}><Text color="red.500">{error}</Text></Box>;
  }

  if (!car) {
    return <Text>Car not found</Text>;
  }

  const handleUpdate = () => {
    navigate(`/admin/updatecar/${carId}`);
  };

   const handleDelete = async () => {
      try {
        const res = await axiosInstance.delete(`/admin/deletecar/${carId}`);
        console.log(res);
        if (res.data === 'deleted Office') {
          alert('Deleted successfully');
          navigate('/admin/carlist');
        } else {
          alert('Deleted successfully');
          navigate('/admin/carlist');
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while deleting the office');
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
