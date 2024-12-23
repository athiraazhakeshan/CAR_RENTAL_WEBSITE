import React, { useState, useEffect } from 'react';
import { useSearch } from '../../components/context/SearchContext';
import { differenceInDays } from 'date-fns';
import { Box, Image, Text, Heading, Flex, Input, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const CarOrderPage1 = () => {
  const { carId } = useParams();
  const { state } = useLocation();
  const [totalAmount, setTotalAmount] = useState(0);
  const rentPerDay = state?.rentalPriceCharge;
  const carimage = state?.carPicture;
  const { searchData, setSearchData } = useSearch();
  const { location, pickupDate, returnDate } = searchData;
  const [days, setDays] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (pickupDate && returnDate) {
      const totalDays = differenceInDays(new Date(returnDate), new Date(pickupDate));
      setDays(totalDays >= 0 ? totalDays : 0);
      const calculatedAmount = rentPerDay * totalDays;
      setTotalAmount(calculatedAmount);
    }
  }, [pickupDate, returnDate]);

  const handleNext = () => {
    if (pickupDate && returnDate) {
      navigate('/user/order/requirements', { state: { totalAmount, carimage, carId } }); // Update with your next page route
    } else {
      alert('Please select both pickup and return dates.');
    }
  };

  return (
    <div>
      <Flex direction={{ base: 'column', md: 'row' }} p="4" maxW="1200px" mx="auto">
        <Box flex="1" p="4">
          <Image src={carimage} alt="Car" objectFit="cover" w="100%" h={{ base: '300px', md: '500px' }} />
        </Box>
        <Box flex="1" p="4">
          <Heading as="h1" mb="4">Car Order Details</Heading>
          <Box mb="4">
            <Text fontSize="lg" mb="2" fontWeight="bold">Pickup Date</Text>
            <Input 
              type="date" 
              value={pickupDate || ''}
              onChange={(e) => setSearchData(prev => ({ ...prev, pickupDate: e.target.value }))}
            />
          </Box>
          <Box mb="4">
            <Text fontSize="lg" mb="2" fontWeight="bold">Return Date</Text>
            <Input 
              type="date" 
              value={returnDate || ''}
              onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
            />
          </Box>
          {pickupDate && returnDate && (
            <Text fontSize="lg" mb="4" fontWeight="bold">Total Days: {days}</Text>
          )}
          {pickupDate && returnDate && (
            <Text fontSize="lg" mb="4" fontWeight="bold">Total Amount: ${rentPerDay * days}</Text>
          )}
          <Button colorScheme="blue" onClick={handleNext}>Next</Button>
        </Box>
      </Flex>
    </div>
  );
};

export default CarOrderPage1;
