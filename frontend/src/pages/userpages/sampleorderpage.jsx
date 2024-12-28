// import React, { useState, useEffect } from 'react';
// import { Box, Image, Text, VStack, HStack, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { axiosInstance } from '../../config/axiosInstance';
// import { useSearch } from '../../components/context/SearchContext';

// const OrderPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const { state } = location;
//   const carId = state?.carId;
//   const totalAmount = state?.totalAmount;
//   const { searchData } = useSearch();
//   const { pickupDate, returnDate } = searchData;

//   // Get the user from Redux store
//   const user = useSelector((state) => state.user.user) || JSON.parse(localStorage.getItem('user'));
//   console.log("userdata",user)


//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
//         }

//         const response = await axiosInstance.get(`/user/getcarbyid/${carId}`);
//         setCar(response.data.data);
//       } catch (error) {
//         console.error('Error fetching car data:', error);
//       }
//     };

//     if (carId) {
//       fetchCar();
//     }
//   }, [carId]);

//   if (!car) {
//     return <Text>Loading...</Text>;
//   }

//   const handleOrder = async () => {
//     if (!user) {
//       alert("User information not found. Please log in again.");
//       navigate('/signin');
//       return;
//     }

//     const orderData = {
//       carId: car._id,
//       totalAmount,
//       userId: user.id, // Access user ID from Redux
//       officeLocationId: car.office,
//       pickedat: pickupDate,
//       returnedat: returnDate,
//     };
// console.log(orderData)
//     try {
//       const response = await axiosInstance.post('/user/createorder', orderData);

//       if (response.data.success) {
//         navigate("/success", {
//           state: {
//             orderId: response.data.order._id,
//           },
//         });
//       } else {
//         alert("Order creation failed!");
//       }
//     } catch (error) {
//       console.error('Error creating order:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <Box p={[3, 5]} maxWidth="1200px" mx="auto">
//       <HStack spacing={[5, 10]} mt={[5, 10]} align="start" flexDirection={['column', 'row']}>
//         {car && (
//           <>
//             <Image src={car.carPicture} alt="Car Image" boxSize={['150px', '300px']} />
//             <VStack spacing={[2, 4]} align="start" width="full">
//               <Text fontSize={['xl', '2xl']} fontWeight="bold">{car.carName}</Text>
//               <SimpleGrid columns={[1, 2]} spacing={[5, 10]} width="full">
//                 <GridItem>
//                   <Text>Car Model: {car.carModel}</Text>
//                   <Text>Car Company: {car.carCompany}</Text>
//                   <Text>Car Engine: {car.carEngine}</Text>
//                 </GridItem>
//                 <GridItem>
//                   <Text>Car Fuel Type: {car.carFuelType}</Text>
//                   <Text>Car Mileage: {car.carMileage}</Text>
//                   <Text>Seat Capacity: {car.carSeatCapacity}</Text>
//                   <Text>Office ID: {car.office}</Text>
//                 </GridItem>
//               </SimpleGrid>
//               <Text>Total Price: ${totalAmount}</Text>
//               <Button onClick={handleOrder} colorScheme="teal" size="md">Place Order</Button>
//             </VStack>
//           </>
//         )}
//       </HStack>
//     </Box>
//   );
// };

// export default OrderPage;
