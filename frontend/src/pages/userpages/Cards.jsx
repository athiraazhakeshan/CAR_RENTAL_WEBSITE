import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const CarCard = ({ car,totalAmount }) => {
  return (
    <Box as={Link} to={`/cars/${car?.id}`} position="relative" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <Image src={car?.carPicture} alt={car?.carName} objectFit="cover" w="100%" h="250px" />
      <Box position="absolute" bottom="0" left="0" right="0" bg="blackAlpha.700" p="4" color="white">
        <Text fontSize="xl" fontWeight="bold">{car?.carName}</Text>
        <Text fontSize="sm">{car?.details}</Text>
        <Text fontSize="lg" fontWeight="semibold" mt="2">${totalAmount}/day</Text>
      </Box>
    </Box>
  );
};
export const Cards = ({ item, handleRemove,totalAmount }) => {


  return (
      <div className="flex w-full h-24 items-center gap-20 bg-base-300 mb-10 rounded-md ">
          <img src={item?.carId?.carPicture} alt="cart-item" className="w-24 h-20" />

          <div>
              <h2>{item?.carId?.carName} </h2>
              <h3>{totalAmount} </h3>
          </div>

          <button className="btn btn-primary" onClick={()=>handleRemove(item?._id)}>Remove</button>
      </div>
  );
};
  
export default Cards
