import React from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const CarCard = ({ car }) => {
  return (
    <Box as={Link} to={`/cars/${car.id}`} position="relative" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <Image src={car.carPicture} alt={car.carName} objectFit="cover" w="100%" h="250px" />
      <Box position="absolute" bottom="0" left="0" right="0" bg="blackAlpha.700" p="4" color="white">
        <Text fontSize="xl" fontWeight="bold">{car.carName}</Text>
        <Text fontSize="sm">{car.details}</Text>
        <Text fontSize="lg" fontWeight="semibold" mt="2">${car.rentalPriceCharge}/day</Text>
      </Box>
    </Box>
  );
};

export default CarCard;
