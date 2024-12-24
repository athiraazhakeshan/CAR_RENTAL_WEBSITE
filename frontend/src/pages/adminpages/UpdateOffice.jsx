import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Input, Button, FormControl, FormLabel, Heading, Flex } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const UpdateOffice = () => {
    const navigate=useNavigate();
    const { officeId } = useParams();
    const [office, setOffice] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pin: '',
        contact: '',
       
    });
    
    useEffect(() => {
        const fetchOffice = async () => {
            try {
                const res = await axiosInstance.get(`admin/getooficebyid/${officeId}`);
                const data = res.data;
                console.log(data)
                setOffice(data);
                console.log(res.data[0].email)
                setFormData({
                    email: res.data[0].email,
                    address: res.data[0].address,
                    city: res.data[0].city,
                    state: res.data[0].state,
                    country: res.data[0].country,
                    pin: res.data[0].pin,
                    contact: res.data[0].contact,
                    
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchOffice();
    }, [officeId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch(`/admin/updateOffice/${officeId}`, formData);
            alert('Office updated successfully');
            navigate(`/admin/offices/${officeId}`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!office) {
        return <Box>Loading...</Box>;
    }

    return (
        <Flex direction="column" align="center" p="4">
            <Heading as="h1" mb="4">Update Office Details</Heading>
            <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px">
                <FormControl mb="4">
                    <FormLabel>Email</FormLabel>
                    <Input name="email" value={formData.email} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>address</FormLabel>
                    <Input name="address" value={formData.address} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car City</FormLabel>
                    <Input name="city" value={formData.city} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>State</FormLabel>
                    <Input name="state" value={formData.state} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Country</FormLabel>
                    <Input name="country" value={formData.country} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Pin</FormLabel>
                    <Input name="pin" value={formData.pin} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Contact</FormLabel>
                    <Input name="contact" value={formData.contact} onChange={handleChange} />
                </FormControl>
                
                
                <Button type="submit" colorScheme="blue">Update</Button>
            </Box>
        </Flex>
    );
};

export default UpdateOffice