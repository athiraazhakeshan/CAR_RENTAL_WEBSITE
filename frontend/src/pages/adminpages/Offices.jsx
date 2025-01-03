import React, { useEffect, useState } from 'react';
import { Box, Table, Flex, Button, Tbody, Tr, Td, Spinner, Heading, useBreakpointValue } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useLocation } from "react-router-dom";

const Offices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllOffices = async () => {
      try {
        const res = await axiosInstance.get("/admin/getAllOffices");
        const data = res.data;
        setOffices(data);
      } catch (error) {
        console.error("Error fetching offices:", error);
        setError("Failed to load offices");
      } finally {
        setLoading(false);
      }
    };
    getAllOffices();
  }, []);

  const handleRowClick = (officeId) => {
    navigate(`${location.pathname}/${officeId}`);
  };

  const handleAddOfficeClick = () => {
    navigate('/admin/addoffice');
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (loading) {
    return <Box p={5}><Spinner /></Box>;
  }

  if (error) {
    return <Box p={5}><Heading size="md" color="red.500">{error}</Heading></Box>;
  }

  return (
    <Box p={5}>
      <Flex justify="flex-end" mb={4}>
        <Button colorScheme="blue" onClick={handleAddOfficeClick}>
          Add Office
        </Button>
      </Flex>
      <Table variant="simple" size={isMobile ? "sm" : "md"}>
        <Tbody>
          {offices.length > 0 ? (
            offices.map((office) => (
              <Tr 
                key={office._id} 
                onClick={() => handleRowClick(office._id)} 
                style={{ cursor: 'pointer' }}
              >
                <Td>{isMobile ? `ID: ${office._id.slice(0, 8)}...` : `ID: ${office._id}`}</Td>
                <Td>{office.email}</Td>
                <Td>{office.address}</Td>
                <Td>{office.city}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>No offices available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Offices;
