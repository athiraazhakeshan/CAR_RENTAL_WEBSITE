import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Cards from "./Cards"; // Make sure the path is correct
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";

const Cart = () => {
    const { state } = useLocation();
    const [cartData, setCartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    //const [totalAmount, setTotalAmount] = useState(state?.totalAmount || 0);
    const totalAmount=state?.totalAmount;
    

    const fetchCartData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/cart/get-cart");
            const data = response?.data?.data;
            setCartData(data);

            // Calculate total amount if it's not passed through state
            // if (!totalAmount) {
            //     const total = data?.car?.reduce((acc, item) => acc + item.carId.rentalPriceCharge, 0);
            //     setTotalAmount(total);
            // }

            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching cart data:", err);
            setError(err.message || "Failed to fetch cart data");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    // useEffect to log cartData whenever it changes
    useEffect(() => {
        if (cartData) {
            console.log("Cart data:", cartData);
        }
    }, [cartData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const handleRemoveItem = async (carId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-car",
                // data: { courseId : courseId },
                data:{carId}
                
            });
            toast.success("item removed from cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "error while removing product");
        }
    };

    // return (
    //     <div>
    //         {/* <h2>Total Amount: ${totalAmount}</h2> */}
    //         {cartData?.car?.map((value) => (
    //             <Cards item={value} key={value._id} totalAmount={totalAmount}   handleRemove={handleRemoveItem}/>
    //         ))}
    //         <div className="w-6/12 bg-base-300 flex flex-col items-center gap-5">
    //             <h2>Price summary</h2>

    //             <h2>Cart Total: {cartData?.totalPrice}</h2>

    //             <button onClick=
    //             '' className="btn btn-success">Checkout</button>
    //         </div>
    //     </div>

    // );


    return (
        <Box py="8">
          <Box maxW="1200px" mx="auto" px="4">
            <Heading as="h1" size="2xl" mb="8">Cars Available</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
              {cartData?.car?.length > 0 ? (
                cartData.car.map((value) => (
                  <Cards
                    item={value}
                    key={value._id}
                    totalAmount={totalAmount}
                    handleRemove={handleRemoveItem}
                  />
                ))
              ) : (
                <p></p>
              )}
            </Grid>
          </Box>
          <Box maxW="1200px" mx="auto" px="4">
             <Text fontSize="lg" fontWeight="semibold" mt="2">Total Price=${cartData?.totalPrice}</Text>
            <Button >CheckOut</Button>
          </Box>
        </Box>
       
      );
      
    };
export default Cart;
