import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Flex,
  Button,
  Tbody,
  Tr,
  Td,
  Spinner,
  Heading,
  Thead,
  Th,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';

const CarList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axiosInstance.get("/admin/getcars");
        console.log("API Response:", res);

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
    navigate(`${location.pathname}/${carId}`);
  };

  const handleAddCarClick = () => {
    navigate('/admin/addcar');
  };

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="lg" />
        <Text mt={2}>Loading cars...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5}>
        <Heading size="md" color="red.500">
          {error}
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={5}>
      {/* Add Car Button */}
      <Flex justify="flex-end" mb={4}>
        <Button
          colorScheme="blue"
          onClick={handleAddCarClick}
          width={{ base: "full", sm: "auto" }}
        >
          Add Car
        </Button>
      </Flex>

      {/* Responsive Table */}
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md" shadow="sm">
        <Table variant="simple" size={isMobile ? "sm" : "md"}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Rent</Th>
              <Th>Transmission</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <Tr
                  key={car._id}
                  onClick={() => handleRowClick(car._id)}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <Td>{isMobile ? car._id.slice(0, 8) + "..." : car._id}</Td>
                  <Td>{car.carName}</Td>
                  <Td>${car.rentalPriceCharge}/day</Td>
                  <Td>{car.transmission}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No cars available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default CarList;
