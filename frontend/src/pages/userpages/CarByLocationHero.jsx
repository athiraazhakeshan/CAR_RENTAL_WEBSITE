
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from './CarCard';
import { Box, Grid, Heading } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';


const CarByLocationHero = () => {
  const location = useLocation();
  const { location: officeLocation } = location.state || {};
  //const officeLocation = location.state?.location ||"kottayam"; // or handle accordingly
 // or handle accordingly

  console.log('Received officeLocation in CarByLocation:', officeLocation);



  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCarsByLocation = async () => {
      if (!officeLocation) {
        console.error("No location passed in state");
        return;
      }

      try {
        const res = await axiosInstance.get(`/user/getcarbylocation/${officeLocation}`);
        console.log("Cars fetched:", res.data);

        // Check if res.data is an array before calling map
        if (Array.isArray(res.data)) {
          setCars(res.data);
        } else {
          console.error('Unexpected response format:', res.data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    getCarsByLocation();
  }, [officeLocation]);

  return (
    <Box py="8">
      <Box maxW="1200px" mx="auto" px="4">
        <Heading as="h1" size="2xl" mb="8">Cars Available </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))
          ) : (
            <p>No cars available for this location.</p>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CarByLocationHero;
