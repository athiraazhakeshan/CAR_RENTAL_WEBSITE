import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from './CarCard';
import { Box, Grid, Heading } from '@chakra-ui/react';

import { axiosInstance } from '../../config/axiosInstance';
const CarByLocation = () => {
    const location = useLocation();
    const { location: officeLocation } = location.state || {};
    const [cars, setCars] = useState([]);
  
    useEffect(() => {
      const getCarsByLocation = async () => {
        
        try {
          const res = await axiosInstance.get(`/user/getcarbylocation/${officeLocation}`, 
            
          );
          setCars(res.data);
        } catch (error) {
          console.error('Error fetching cars:', error);
         
        }
      };
      getCarsByLocation();
    }, [officeLocation]);
    return(
    <Box  py="8">
    <Box maxW="1200px" mx="auto" px="4">
      <Heading as="h1" size="2xl" mb="8">Our Cars</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </Grid>
    </Box>
  </Box>
);
};

export default CarByLocation