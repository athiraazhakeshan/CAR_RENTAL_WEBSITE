import React, { useEffect, useState } from 'react';
import { Box, Table, Tbody, Tr, Td, Spinner, Heading } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);  // Ensure users are initialized as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the user from the Redux store
  const user = useSelector((state) => state.user.user);

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/getAllUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API response:', response.data);
        setUsers(response.data || []);  // Set users data directly from response
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getAllUsers();
    } else {
      setError('No token found');
      setIsLoading(false);
    }
  }, [token]);

  const handleRowClick = (userId) => {
    navigate(`${location.pathname}/${userId}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Heading>Error loading users: {error.message || error}</Heading>;
  }

  return (
    <Box p={5}>
      <Table variant="simple">
        <Tbody>
          {/* Ensure 'users' is an array before calling map */}
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <Tr key={user._id} onClick={() => handleRowClick(user._id)} style={{ cursor: 'pointer' }}>
                <Td>ID: {user._id}</Td>
                <Td>Name: {user.firstName}</Td>
                <Td>Email: {user.email}</Td>
                <Td>Address: {user.address}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4">No users available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Users;
