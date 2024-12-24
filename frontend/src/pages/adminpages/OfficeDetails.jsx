import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const OfficeDtails = () => {
  const { officeId } = useParams();
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const getAllOffices = async () => {
      try {
        const res = await axiosInstance.get('/admin/getAllOffices');
        const data = await res.data;
        setOffices(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllOffices();
  }, []);

  console.log(officeId);
  const office = offices.find(f => f.id === officeId);

  if (!office) {
    return <Text>Office not found</Text>;
  }

  const handleUpdate = () => {
    navigate(`/admin/updateOffice/${officeId}`);
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/admin/deleteOffice/${officeId}`);
      console.log(res);
      if (res.data === 'deleted Office') {
        alert('Deleted successfully');
        navigate('/admin/offices');
      } else {
        alert('Failed to delete office');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while deleting the office');
    }
  };
  

  return (
    <Flex direction={{ base: 'column', md: 'row' }} p="4" maxW="1200px" mx="auto">
      <Box flex="1" p="4">
        <Text fontSize="lg" mb="4" fontWeight="bold">Email: {office.email}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Address: {office.address}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">City: {office.city}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">State: {office.state}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Country: {office.country}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Pin: {office.pin}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Contact: {office.contact}</Text>
        <Flex mt="4">
          <Button colorScheme="blue" mr="4" onClick={handleUpdate}>Update</Button>
          <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default OfficeDtails;
