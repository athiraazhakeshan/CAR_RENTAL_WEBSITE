import React, { useEffect, useState } from 'react';
import { Box, Table,Flex,Button, Tbody, Tr, Td, Spinner, Heading } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';

import { Link, useNavigate ,useLocation } from "react-router-dom";

const Offices = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [offices,setOffices]=useState([]);
    useEffect(() => {
        const getAllOffices = async () => {
          try {
            const res = await axiosInstance.get(
              "/admin/getAllOffices",
            );
            const data = await res.data;
            console.log(data);
            setOffices(data);
          } catch (error) {
            console.log(error);
          }
        };
        getAllOffices();
      }, []);
 
      const handleRowClick = (officeId) => {
        navigate(`${location.pathname}/${officeId}`);
      };
      const handleAddOfficeClick=()=>{
        navigate('/admin/addoffice')
      }
  return (
    <Box p={5}>
   <Flex justify="flex-end" mb={4}>
        <Button colorScheme="blue" onClick={handleAddOfficeClick}>Add Office</Button>
      </Flex>
    <Table variant="simple">
      <Tbody>
      {offices.map((office) => (
            <Tr key={office._id} onClick={() => handleRowClick(office._id)} style={{ cursor: 'pointer' }}>
              <Td>ID: {office._id}</Td>
              <Td>Email: {office.email}</Td>
              <Td>Address: {office.address}</Td>
              <Td>City: {office.city}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  </Box>
  );
};
export default Offices