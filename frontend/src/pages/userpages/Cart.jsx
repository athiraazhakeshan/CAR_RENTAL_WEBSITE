import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Cards from "./Cards"; // Make sure the path is correct

const Cart = () => {
    const { state } = useLocation();
    const [cartData, setCartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalAmount, setTotalAmount] = useState(state?.totalAmount || 0);

    const fetchCartData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/cart/get-cart");
            const data = response?.data?.data;
            setCartData(data);

            // Calculate total amount if it's not passed through state
            if (!totalAmount) {
                const total = data?.car?.reduce((acc, item) => acc + item.carId.rentalPriceCharge, 0);
                setTotalAmount(total);
            }

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

    return (
        <div>
            <h2>Total Amount: ${totalAmount}</h2>
            {cartData?.car?.map((value) => (
                <Cards item={value} key={value._id} totalAmount={totalAmount}/>
            ))}
        </div>
    );
};

export default Cart;
