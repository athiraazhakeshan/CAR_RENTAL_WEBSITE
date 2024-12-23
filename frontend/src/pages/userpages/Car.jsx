import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { CarCard } from "./CarCard";


export const Car = () => {

    const[cars,setCars]=useState([])

    const fetchCar = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "user/getcars",
            });
            setCars(response?.data?.data);
            console.log("response===", response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      fetchCar();
    }, []);
    return <div>
    {cars.map((value,index)=>(
     <CarCard car={value} key={value?._id}/>
    ))}
    </div>;
  };