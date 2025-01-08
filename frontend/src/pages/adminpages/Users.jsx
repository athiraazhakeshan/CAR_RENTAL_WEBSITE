// import React, { useEffect, useState } from 'react';
// import { Box, Table, Tbody, Tr, Td, Spinner, Heading, Thead, Th } from '@chakra-ui/react';
// import { axiosInstance } from '../../config/axiosInstance';
// import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux';

// const Users = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [users, setUsers] = useState([]); 
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const getAllUsers = async () => {
//       try {
//         const response = await axiosInstance.get('/admin/getAllUsers', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setUsers(response.data || []); 
//         console.log(data)
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (token) {
//       getAllUsers();
//     } else {
//       setError('No token found');
//       setIsLoading(false);
//     }
//   }, [token]);

//   const handleRowClick = (userId) => {
//     navigate(`${location.pathname}/${userId}`);
//   };

//   if (isLoading) {
//     return (
//       <Box p={5} textAlign="center">
//         <Spinner size="lg" />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={5} textAlign="center">
//         <Heading size="md" color="red.500">
//           Error loading users: {error.message || error}
//         </Heading>
//       </Box>
//     );
//   }

//   return (
//     <Box p={5}>
//       <Box 
//         overflowX="auto" 
//         border="1px solid" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         p={3} 
//         shadow="sm"
//       >
//         <Table variant="simple" size="sm">
//           <Thead>
//             <Tr>
//               <Th>ID</Th>
//               <Th>Name</Th>
//               <Th>Email</Th>
//               <Th>Address</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {Array.isArray(users) && users.length > 0 ? (
//               users.map((user) => (
//                 <Tr 
//                   key={user._id} 
//                   onClick={() => handleRowClick(user._id)} 
//                   _hover={{ bg: "gray.100" }} 
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <Td>{user._id}</Td>
//                   <Td>{user.firstName}</Td>
//                   <Td>{user.email}</Td>
//                   <Td>{user.address}</Td>
//                 </Tr>
//               ))
//             ) : (
//               <Tr>
//                 <Td colSpan={4} textAlign="center">
//                   No users available
//                 </Td>
//               </Tr>
//             )}
//           </Tbody>
//         </Table>
//       </Box>
//     </Box>
//   );
// };

// export default Users;
import React, { useEffect, useState } from 'react';
import { Box, Table, Tbody, Tr, Td, Spinner, Heading, Thead, Th, Button } from '@chakra-ui/react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token'); // Fetch token from localStorage

// In the frontend Users component
useEffect(() => {
  const getAllUsers = async () => {
    console.log("Fetching users...");

    try {
      const response = await axiosInstance.get('/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", response.data);
      setUsers(response.data || []);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || 'An error occurred while fetching users');
    } finally {
      setIsLoading(false);
    }
  };

  getAllUsers();
}, [token]);


  const handleRowClick = (userId) => {
    navigate(`${location.pathname}/${userId}`);
  };

  if (isLoading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5} textAlign="center">
        <Heading size="md" color="red.500" mb={4}>
          {error === 'No token found'
            ? 'You are not logged in. Please log in to access user data.'
            : `Error loading users: ${error}`}
        </Heading>
        {error === 'No token found' && (
          <Button colorScheme="blue" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Box
        overflowX="auto"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        p={3}
        shadow="sm"
      >
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <Tr
                  key={user._id}
                  onClick={() => handleRowClick(user._id)}
                  _hover={{ bg: 'gray.100' }}
                  style={{ cursor: 'pointer' }}
                >
                  <Td>{user._id}</Td>
                  <Td>{user.firstName || 'N/A'}</Td>
                  <Td>{user.email || 'N/A'}</Td>
                  <Td>{user.address || 'N/A'}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No users available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Users;
