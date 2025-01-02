// import React, { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';
// import toast from "react-hot-toast";
// import { axiosInstance } from "../../config/axiosInstance";
// import Cards from "./Cards"; // Ensure the path is correct
// import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
// import { loadStripe } from "@stripe/stripe-js";

// const Cart = () => {
//     const { state } = useLocation();
//     const [cartData, setCartData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState("");
//     const totalAmount = state?.totalAmount;

//     // Fetch cart data
//     const fetchCartData = async () => {
//         try {
//             setIsLoading(true);
//             const response = await axiosInstance.get("/cart/get-cart");  // Ensure correct endpoint
//             const data = response?.data?.data;

//             // Ensure the totalPrice is a number
//             if (data && data.totalPrice !== undefined) {
//               // Convert totalPrice to number and check if it's a valid number
//               data.totalPrice = Number(data.totalPrice);
//               if (isNaN(data.totalPrice) || data.totalPrice <= 0) {
//                   throw new Error("Invalid total price");
//               }
//           } else {
//               throw new Error("Total price missing in cart data");
//           }
//             setCartData(data);
//             setIsLoading(false);
//         } catch (err) {
//             console.error("Error fetching cart data:", err);
//             setError(err.message || "Failed to fetch cart data");
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCartData();
//     }, []);

//     useEffect(() => {
//         if (cartData) {
//             console.log("Cart data:", cartData);
//         }
//     }, [cartData]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     const handleRemoveItem = async (carId) => {
//         try {
//             await axiosInstance({
//                 method: "DELETE",
//                 url: "/cart/remove-car",
//                 data: { carId }
//             });
//             toast.success("Item removed from cart");
//             fetchCartData(); // Refresh the cart data after removal
//         } catch (error) {
//             console.log(error);
//             toast.error(error?.response?.data?.message || "Error while removing product");
//         }
//     };

//     const makePayment = async () => {
//         try {
//             const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

//             const session = await axiosInstance({
//                 url: "/payment/create-checkout-session",
//                 method: "POST",
//                 data: {
//                     products: cartData?.car,
//                     totalPrice: isNaN(cartData?.totalPrice) ? 0 : cartData?.totalPrice,
//                 },
//             });

//             console.log(session, "=======session");
//             const result = await stripe.redirectToCheckout({
//                 sessionId: session?.data?.sessionId,
//             });

//             if (result.error) {
//                 toast.error(result.error.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message || "Payment failed");
//         }
//     };

//     return (
//         <Box py="8">
//             <Box maxW="1200px" mx="auto" px="4">
//                 <Heading as="h1" size="2xl" mb="8">Cars in Your Cart</Heading>
//                 <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
//                     {cartData?.car.length > 0 ? (
//                         cartData?.car.map((value) => (
//                             <Cards
//                                 item={value}
//                                 key={value._id}
//                                 totalAmount={totalAmount}
//                                 handleRemove={handleRemoveItem}
//                             />
//                         ))
//                     ) : (
//                         <Text>No items in the cart</Text>
//                     )}
//                 </Grid>
//             </Box>
//             <Box maxW="1200px" mx="auto" px="4" mt="8">
//                 <Text fontSize="lg" fontWeight="semibold">Total Price: ${cartData?.totalPrice}</Text>
//                 <Button onClick={makePayment} mt="4">Check Out</Button>
//             </Box>
//         </Box>
//     );
// };

// export default Cart;
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Cards from "./Cards"; // Ensure the path is correct
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const { state } = useLocation();
    const [cartData, setCartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalAmount, setTotalAmount] = useState(0); // This will store the total price

    // Fetch cart data
    const fetchCartData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/cart/get-cart");  // Ensure correct endpoint
            const data = response?.data?.data;

            if (!data || !data.car || data.car.length === 0) {
                throw new Error("No items in cart");
            }

            // Calculate the total price based on cart items
            const calculatedTotal = data.car.reduce((acc, item) => acc + item.rentalPriceCharge, 0);

            // Set cart data and calculated total
            setCartData(data);
            console.log(data)
            setTotalAmount(calculatedTotal);
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

    const handleRemoveItem = async (carId) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-car",
                data: { carId }
            });
            toast.success("Item removed from cart");
            fetchCartData(); // Refresh the cart data after removal
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Error while removing product");
        }
    };

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: {
                    products: cartData?.car,
                    totalPrice: cartData?.totalPrice,
                },
            });

            const result = await stripe.redirectToCheckout({
                sessionId: session?.data?.sessionId,
            });

            if (result.error) {
                toast.error(result.error.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Payment failed");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box py="8">
            <Box maxW="1200px" mx="auto" px="4">
                <Heading as="h1" size="2xl" mb="8">Cars in Your Cart</Heading>
                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
                    {cartData?.car.length > 0 ? (
                        cartData?.car.map((value) => (
                            <Cards
                                item={value}
                                key={value._id}
                                totalAmount={totalAmount}
                                handleRemove={handleRemoveItem}
                            />
                        ))
                    ) : (
                        <Text>No items in the cart</Text>
                    )}
                </Grid>
            </Box>
            <Box maxW="1200px" mx="auto" px="4" mt="8">
                <Text fontSize="lg" fontWeight="semibold">Total Price: ${cartData?.totalPrice}</Text>
                <Button onClick={makePayment} mt="4">Check Out</Button>
            </Box>
        </Box>
    );
};

export default Cart;
