// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, Flex, Spacer, Text, Button } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearUser } from '../redux/features/userSlice';
// import { useNavigate } from 'react-router-dom';

// const TopBar = () => {
//   const user = useSelector(state => state.user.user); 
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   console.log("Current user state:", user); // Debugging log

//   return (
//     <Box bg="gray.800" color="white" px="4" py="2">
//       <Flex maxW="1200px" mx="auto" alignItems="center">
//         <Text fontSize="sm">Welcome to Car Rental</Text>
//         <Spacer />
//         <Flex alignItems="center">
//           {user && user.firstName ? (
//             <>
//               <Text fontSize="sm" mr="4">Hello, {user.firstName}</Text>
//               <Button onClick={handleLogout} size="sm" colorScheme="red">Logout</Button>
//             </>
//           ) : (
//             <>
//               <Link to="/signin" ml="4" fontSize="sm">SignIn | </Link>
//               <Link to="/signup" ml="4" fontSize="sm">SignUp | </Link>
//               <Link to="/admin/adminlogin" ml="4" fontSize="sm">Admin  </Link>
//             </>
//           )}
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default TopBar;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
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
          {user && user.firstName ? (
            <>
              <Text fontSize="sm" mr="4">Hello, {user.firstName}</Text>
              <Link to="/user/signin" onClick={handleLogout} style={{ marginLeft: '10px', fontSize: 'sm' }}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/user/signin" ml="4" fontSize="sm">SignIn | </Link>
              <Link to="/signup" ml="4" fontSize="sm">SignUp | </Link>
              <Link to="/admin/adminlogin" ml="4" fontSize="sm">Admin</Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
