import React, { useEffect, useState } from 'react';
import { Box, Table, Flex, Button, Tbody, Tr, Td } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import { Spinner ,Heading} from '@chakra-ui/react';

const CarList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axiosInstance.get("/admin/getcars");
        console.log("API Response:", res); // Log the full response object to understand its structure
        
        if (res && res.data && Array.isArray(res.data.data)) {
          setCars(res.data.data);
        } else {
          console.error("Expected an array but got:", res.data);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };
    getAllCars();
  }, []);
  const handleRowClick = (carId) => {
    console.log("Navigating to:", `${location.pathname}/${carId}`); // Log to check if the path is correct
    navigate(`${location.pathname}/${carId}`);
    console.log("Location Pathname:", location.pathname); // Check what this outputs

  };
  

  const handleAddCarClick = () => {
    navigate('/admin/addcar');
  };

  if (loading) {
    return <Box p={5}><Spinner /></Box>;
  }

  if (error) {
    return <Box p={5}><Heading size="md" color="red.500">{error}</Heading></Box>;
  }

  return (
    <Box p={5}>
      <Flex justify="flex-end" mb={4}>
        <Button colorScheme="blue" onClick={handleAddCarClick}>Add Car</Button>
      </Flex>
      <Table variant="simple">
        <Tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <Tr key={car._id} onClick={() => handleRowClick(car._id)} style={{ cursor: 'pointer' }}>
                <Td>ID: {car._id}</Td>
                <Td>Name: {car.carName}</Td>
                <Td>Rent: {car.rentalPriceCharge}</Td>
                <Td>Transmission: {car.transmission}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>No cars available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CarList;
