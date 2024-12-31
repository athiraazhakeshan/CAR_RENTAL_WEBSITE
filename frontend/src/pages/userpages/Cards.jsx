import React from 'react';
import { Box, Button, Center, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';



export const Cards = ({ item,handleRemove,totalAmount }) => {
  return (
    <Box  position="relative" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <Image src={item?.carId?.carPicture} objectFit="cover" w="100%" h="250px" />
      <Box position="absolute" bottom="0" left="0" right="0" bg="blackAlpha.700" p="4" color="white">
        <Text fontSize="xl" fontWeight="bold">{item?.carId?.carName}</Text>
        <Text fontSize="sm">{item?.carId?.details}</Text>
{/* <Text fontSize="sm">{totalAmount}</Text> */}
        <Text fontSize="lg" fontWeight="semibold" mt="2">${item?.carId.rentalPriceCharge}/day</Text>
          <Button onClick={()=>handleRemove(item?._id)}>Remove</Button>
      </Box>
    </Box>
  );
};
// export const Cards = ({ item, handleRemove,totalAmount }) => {


//   return (
//       <div className="flex w-full h-32 items-center gap-20 bg-base-300 mb-5 rounded-badge ">
//          <Box  position="relative" borderRadius="lg" overflow="hidden" boxShadow="md"></Box>
//           <img src={item?.carId?.carPicture} alt="cart-item" className="w-24 h-20" />

//           <div>
//               <h2>car name:{item?.carId?.carName} </h2>
              
//               <h3>{item?.carId?.totalPrice} </h3>
              
//           </div>

//           <button className="btn btn-primary" onClick={()=>handleRemove(item?._id)}>Remove</button>
//           <Box/>
//       </div>
//   );
// };
  
export default Cards
