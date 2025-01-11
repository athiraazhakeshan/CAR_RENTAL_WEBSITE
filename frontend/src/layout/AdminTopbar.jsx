
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

export const AdminTopbar = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user state in Redux:", user); // Debugging log
  }, [user]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/signin');
  };

  return (
    <Box bg="gray.800" color="white" px="4" py="2">
      <Flex maxW="1200px" mx="auto" alignItems="center">
        <Text fontSize="sm">Welcome to Car Rental</Text>
        <Spacer />
        <Flex alignItems="center">
        
            <>
            
            
            </>
    
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminTopbar;
