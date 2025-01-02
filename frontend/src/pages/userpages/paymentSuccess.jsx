import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-2">Thank you for your order.</p>
        <p className="mb-4">Your payment has been successfully processed.</p>
       
        <Button colorScheme="blue" onClick={() => navigate('/my-order')}>Go to My Order</Button>
        
      </div>
    </div>
  );
};

export default PaymentSuccess;

