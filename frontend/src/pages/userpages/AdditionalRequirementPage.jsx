import React, { useState } from 'react';
import { Box, Heading, Button, Text, Flex, Switch, Stack, Link } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdditionalRequirementsPage = () => {
    const rows = [
        { id: 1, name: 'Row 1', details: 'Suitable for babies up to 12 months old.' },
        { id: 2, name: 'Row 2', details: "We'll guarantee there's GPS navigation in your rental vehicle." },
        { id: 3, name: 'Row 3', details: ' Want to share the driving? Add other drivers.' }
        // ... other rows ...
    ];
    
    const navigate = useNavigate();
    const { state } = useLocation();
    const [totalAmount, setTotalAmount] = useState(state?.totalAmount || 0);
    const [clickedRowId, setClickedRowId] = useState(null);
    const carimage=state?.carimage;
    const carId=state?.carId;
        const handleRowClick = (rowId) => {
        setClickedRowId((prevRowId) => (prevRowId === rowId ? null : rowId));
    };
    
    const [facilities, setFacilities] = useState({
        babySeat: false,
        gps: false,
        additionalDriver: false,
    });

    const facilityCosts = {
        babySeat: 500,
        gps: 500,
        additionalDriver: 20,
    };

    const handleNext = () => {
        navigate('/user/orderpage', { state: { totalAmount,carId } }); // Update with your next page route
    };

    const handleToggleChange = (facility) => {
        setFacilities((prevFacilities) => {
            const newState = !prevFacilities[facility];
            const updatedFacilities = { ...prevFacilities, [facility]: newState };

            // Update total amount based on facility selection
            const cost = facilityCosts[facility];
            const updatedTotalAmount = newState
                ? totalAmount + cost
                : totalAmount - cost;

            setTotalAmount(updatedTotalAmount);
            console.log('Updated Total Amount:', updatedTotalAmount);

            return updatedFacilities;
        });
    };

    return (
        <div>
            {console.log(totalAmount)}
            {console.log(carimage)}
            {console.log(carId)}

            <Box p="4" maxW="1200px" mx="auto">
                <Flex justify="space-between" align="center" mb="4" borderBottom="1px" borderColor="gray.200" pb="2">
                    <Heading as="h1" size="lg">What Additional Requirements</Heading>
                    <Flex align="center">
                        <Text fontSize="lg" mr="4" fontWeight="bold">Total Price: ${totalAmount}</Text>
                        <Button colorScheme="blue" onClick={handleNext}>Next</Button>
                    </Flex>
                </Flex>

                <Stack spacing="4">
                    <Box borderWidth="1px" borderRadius="lg" p="4">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontSize="lg">Need Baby Seat</Text>
                            <Flex align="center">
                                <Link href="#" onClick={() => handleRowClick(1)} color="blue.500" fontSize="md" mr="2">
                                    {/* {clickedRowId === 1 ? 'Close' : 'Details'} */}
                                </Link>
                                <Switch isChecked={facilities.babySeat} onChange={() => handleToggleChange('babySeat')} />
                            </Flex>
                        </Flex>
                        <Text mt="2" fontSize="md" color="gray.600">Amount: $500/day</Text>
                        {clickedRowId === 1 && (
                            <div align="center">
                                {rows.find(row => row.id === 1).details}
                            </div>
                        )}
                    </Box>

                    <Box borderWidth="1px" borderRadius="lg" p="4">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontSize="lg">Need GPS</Text>
                            <Flex align="center">
                                <Link href="#" onClick={() => handleRowClick(2)} color="blue.500" fontSize="md" mr="2">
                                    {/* {clickedRowId === 2 ? 'Close' : 'Details'} */}
                                </Link>
                                <Switch isChecked={facilities.gps} onChange={() => handleToggleChange('gps')} />
                            </Flex>
                        </Flex>
                        <Text mt="2" fontSize="md" color="gray.600">Amount: $500/day</Text>
                        {clickedRowId === 2 && (
                            <div align="center">
                                {/* {rows.find(row => row.id === 2).details} */}
                            </div>
                        )}
                    </Box>

                    <Box borderWidth="1px" borderRadius="lg" p="4">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontSize="lg">Need Additional Driver</Text>
                            <Flex align="center">
                                <Link href="#" onClick={() => handleRowClick(3)} color="blue.500" fontSize="md" mr="2">
                                    {/* {clickedRowId === 3 ? 'Close' : 'Details'} */}
                                </Link>
                                <Switch isChecked={facilities.additionalDriver} onChange={() => handleToggleChange('additionalDriver')} />
                            </Flex>
                        </Flex>
                        <Text mt="2" fontSize="md" color="gray.600">Amount: $20/day</Text>
                        {clickedRowId === 3 && (
                            <div align="center">
                                {rows.find(row => row.id === 3).details}
                            </div>
                        )}
                    </Box>
                </Stack>
            </Box>
        </div>
    );
};

export default AdditionalRequirementsPage;