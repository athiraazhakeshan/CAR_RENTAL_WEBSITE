// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Input, Button, FormControl, FormLabel, Heading, Flex } from '@chakra-ui/react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../../config/axiosInstance';
// const UpdateCarForm = () => {
//     const navigate=useNavigate();
//     const { carId } = useParams();
//     const [car, setCar] = useState(null);
//     const [formData, setFormData] = useState({
//         carName: '',
//         carModel: '',
//         carCompany: '',
//         carCategory: '',
//         carEngine: '',
//         transmission: '',
//         carMileage: '',
//         carFuelType: '',
//         rentalPriceCharge: '',
//         carPicture: null,
//     });
    
//     useEffect(() => {
//         const fetchCar = async () => {
//             try {
//                 const res = await axiosInstance.get(`/admin/getcarbyid/${carId}`);
//                 const data = res.data.data; // This should be the car data
//                 console.log(data)
    
//                 // Check if the data is an array and access the first item if necessary
//                 if (Array.isArray(data) && data.length > 0) {
//                     setCar(data[0]); // Assuming data is an array, use the first element
//                 } else if (data) {
//                     setCar(data); // If the data is not an array, it should be an object
//                 } else {
//                     console.error("No car data found in response");
//                 }
    
//                 // Set form data only after setting the car object
//                 if (data && !Array.isArray(data)) {
//                     setFormData({
//                         carName: data.carName || '',
//                         carModel: data.carModel || '',
//                         carCompany: data.carCompany || '',
//                         carCategory: data.carCategory || '',
//                         carEngine: data.carEngine || '',
//                         transmission: data.transmission || '',
//                         carMileage: data.carMileage || '',
//                         carFuelType: data.carFuelType || '',
//                         rentalPriceCharge: data.rentalPriceCharge || '',
//                         carPicture: null, 
//                     });
//                 }
    
//             } catch (error) {
//                 console.error(error);
//             }
//         };
    
//         fetchCar();
//     }, [carId]);
    

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//     const handleFileChange = (e) => {
//         setFormData({
//             ...formData,
//             carPicture: e.target.files[0],
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axiosInstance.patch(`/admin/updatecar/${carId}`, formData);
//             alert('Car updated successfully');
//             navigate(`/admin/carlist/${carId}`);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     if (!car) {
//         return <Box>Loading...</Box>;
//     }

//     return (
//         <Flex direction="column" align="center" p="4">
//             <Heading as="h1" mb="4">Update Car Details</Heading>
//             <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px">
//                 <FormControl mb="4">
//                     <FormLabel>Car Name</FormLabel>
//                     <Input name="carName" value={formData.carName} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Car Model</FormLabel>
//                     <Input name="carModel" value={formData.carModel} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Car Company</FormLabel>
//                     <Input name="carCompany" value={formData.carCompany} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Car Category</FormLabel>
//                     <Input name="carCategory" value={formData.carCategory} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Car Engine</FormLabel>
//                     <Input name="carEngine" value={formData.carEngine} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Transmission</FormLabel>
//                     <Input name="transmission" value={formData.transmission} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Car Mileage</FormLabel>
//                     <Input name="carMileage" value={formData.carMileage} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Fuel Type</FormLabel>
//                     <Input name="carFuelType" value={formData.carFuelType} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Rental Price Charge</FormLabel>
//                     <Input name="rentalPriceCharge" value={formData.rentalPriceCharge} onChange={handleChange} />
//                 </FormControl>
//                 <FormControl mb="4">
//                     <FormLabel>Car Picture</FormLabel>
//                     <Input type="file" name="carPicture" accept="image/*" onChange={handleFileChange} />
//                 </FormControl>
                
//                 <Button type="submit" colorScheme="blue">Update</Button>
//             </Box>
//         </Flex>
//     );
// };

// export default UpdateCarForm;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Input, Button, FormControl, FormLabel, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const UpdateCarForm = () => {
    const navigate = useNavigate();
    const { carId } = useParams();
    const [formData, setFormData] = useState({
        carName: '',
        carModel: '',
        carCompany: '',
        carCategory: '',
        carEngine: '',
        transmission: '',
        carMileage: '',
        carFuelType: '',
        rentalPriceCharge: '',
        carPicture: null,
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axiosInstance.get(`/admin/getcarbyid/${carId}`);
                const data = res.data.data;

                if (data) {
                    setFormData({
                        carName: data.carName || '',
                        carModel: data.carModel || '',
                        carCompany: data.carCompany || '',
                        carCategory: data.carCategory || '',
                        carEngine: data.carEngine || '',
                        transmission: data.transmission || '',
                        carMileage: data.carMileage || '',
                        carFuelType: data.carFuelType || '',
                        rentalPriceCharge: data.rentalPriceCharge || '',
                        carPicture: null,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCar();
    }, [carId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            carPicture: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            await axiosInstance.patch(`/admin/updatecar/${carId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Car updated successfully');
            navigate(`/admin/carlist/${carId}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (!formData) {
        return <Box>Loading...</Box>;
    }

    return (
        <Flex direction="column" align="center" p="4">
            <Heading as="h1" mb="4">Update Car Details</Heading>
            <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px">
                <FormControl mb="4">
                    <FormLabel>Car Name</FormLabel>
                    <Input name="carName" value={formData.carName} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Model</FormLabel>
                    <Input name="carModel" value={formData.carModel} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Company</FormLabel>
                    <Input name="carCompany" value={formData.carCompany} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Category</FormLabel>
                    <Input name="carCategory" value={formData.carCategory} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Engine</FormLabel>
                    <Input name="carEngine" value={formData.carEngine} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Transmission</FormLabel>
                    <Input name="transmission" value={formData.transmission} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Mileage</FormLabel>
                    <Input name="carMileage" value={formData.carMileage} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Fuel Type</FormLabel>
                    <Input name="carFuelType" value={formData.carFuelType} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Rental Price Charge</FormLabel>
                    <Input name="rentalPriceCharge" value={formData.rentalPriceCharge} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Picture</FormLabel>
                    <Input type="file" name="carPicture" accept="image/*" onChange={handleFileChange} />
                </FormControl>
                <Button type="submit" colorScheme="blue">Update</Button>
            </Box>
        </Flex>
    );
};

export default UpdateCarForm;
