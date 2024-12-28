
import React, { useState, useEffect } from "react";
import axios from 'axios';
import carImage from "../../assets/white-car.png"; // Update the path based on your file structure
import About from "./About";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS for animations
import { axiosInstance } from "../../config/axiosInstance";

// Yup validation schema
const schema = yup.object({
  location: yup.string().required("Location is required"),
  pickupDate: yup.date().required("Pickup date is required"),
  returnDate: yup.date().required("Return date is required"),
}).required();

export const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [formData, setFormData] = useState({
    location: "",
    pickupDate: "",
    returnDate: ""
  });

  const [offices, setOffices] = useState([]); // State for storing offices

  // Fetch offices data
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axiosInstance.get("/user/getAllOffices");
        const data = await res.data;
        console.log("Fetched offices data:", data); // Debug fetched data
        if (Array.isArray(data)) {
          setOffices(data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };
    fetchOffices();
  }, []);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // Unique cities from the fetched offices
  const uniqueCities = Array.isArray(offices) ? [...new Set(offices.map(office => office.city))] : [];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema) // Using yupResolver for validation
  });

  // Handle form submission
  const onSubmit = (data) => {
    // Set the search data using useState
    setFormData({
      location: data.location,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate
    });
    // Navigate to the 'carsbylocation' page with the form data as state
    navigate("/user/carsbylocation/:city", { state: { location: data.location } });
  };

  return (
    <div className="bg-transparent">
      <div className="container min-h-[620px] flex flex-col justify-center items-center">
        <div className={`w-full max-w-3xl p-8 mt-8 rounded-lg shadow-lg`}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="location" className="mb-2 font-semibold">
                Location
              </label>
              <select
                id="location"
                name="location"
                className={`px-4 py-2 border rounded-md`}
                {...register("location")}
              >
                <option value="" disabled>
                  Select a location
                </option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="pickupDate" className="mb-2 font-semibold">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                className={`px-4 py-2 border rounded-md`}
                {...register("pickupDate")}
              />
              {errors.pickupDate && <p className="text-red-500">{errors.pickupDate.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="returnDate" className="mb-2 font-semibold">
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                className={`px-4 py-2 border rounded-md`}
                {...register("returnDate")}
              />
              {errors.returnDate && <p className="text-red-500">{errors.returnDate.message}</p>}
            </div>
            <div className="flex w-full sm:w-auto space-x-4">
              <button
                type="submit"
                className="w-full sm:w-auto py-2 px-4 font-semibold text-white bg-red-950 rounded-md hover:bg-primary/80 transition duration-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="">
          <main className="min-h-96 flex gap-20 px-20 py-10 w-full">
            <div className="space-y-5 order-2 sm:order-1 sm:pr-32">
              <p data-aos="fade-up" className="text-primary text-2xl font-serif">
                Effortless
              </p>
              <h1 data-aos="fade-up" data-aos-delay="600" className="text-5xl lg:text-7xl font-semibold font-serif">
                Car Rental
              </h1>
              <p data-aos="fade-up" data-aos-delay="1000">
                Renting a car is like borrowing freedom for a while
              </p>
              <p className="">
                Get Started
              </p>
            </div>
            <div className="w-5/12">
              <img className="w-full" src={carImage} alt="car-image" />
            </div>
          </main>
        </div>
      </div>
      <div>
        <About />
      </div>
    </div>
  );
};
