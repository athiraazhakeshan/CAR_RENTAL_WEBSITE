
import React, { useState, useEffect } from 'react';
import { CarCard } from '../pages/userpages/CarCard.jsx';
import { Box, Grid, Heading } from '@chakra-ui/react';
import { axiosInstance } from '../config/axiosInstance';

const Hero1 = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "user/getcars",
        });
        setCars(response?.data?.data);
        console.log("response===", response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCars();
  }, []);

  return (
    <Box bg="gray.100" color="black" py="8">
      <Box maxW="1200px" mx="auto" px="4">
        <Heading as="h1" size="xl" mb="8">Which car do you want????</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero1;
