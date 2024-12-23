import React, { useEffect, useState, useContext } from "react";
import carPng from "../assets/Car.png";
import yellowCar from "../assets/banner-car.jpg";
import AOS from "aos";
import * as yup from "yup";
import "aos/dist/aos.css"; // Add this import to include AOS styles
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import axios from 'axios';
import { useSearch } from "./context/SearchContext";
import { ThemeContext } from "./context/themeContext";

const schema = yup.object({
  officeLocation: yup.string().required(),
}).required();

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    AOS.refresh();
  }, []);

  const navigate = useNavigate();
  const [offices, setOffice] = useState([]);
  const { searchData, setSearchData } = useSearch();

  useEffect(() => {
    const fetchOffices = async () => {
        try {
          const res = await axiosInstance.get("user/getAllOffices");
          setOffice(res.data);
        } catch (error) {
          console.error("Error fetching office data:", error);
        }
      };
  
      fetchOffices();
    }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setSearchData({
      location: data.officeLocation,
      pickupDate: searchData.pickupDate,
      returnDate: searchData.returnDate
    });
    navigate("/user/carsbylocation/:city", { state: { location: data.officeLocation } });
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const uniqueCities = [...new Set(offices.map(office => office.city))];

  return (
    <div className={`overflow-x-hidden ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <div className="container min-h-[620px] flex flex-col justify-center items-center">
      <div
          className={`w-full max-w-3xl p-8 mt-8 rounded-lg shadow-lg ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
          // data-aos="fade-up"
          // data-aos-delay="2000"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="location" className="mb-2 font-semibold">
                Location
              </label>
              <select
                id="location"
                className={`px-4 py-2 border rounded-md ${theme === "light" ? "border-gray-300" : "dark:bg-gray-700 dark:border-gray-600"}`}
                {...register("officeLocation")}
              >
                <option value="" disabled selected>
                  Select a location
                </option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="pickup-date" className="mb-2 font-semibold">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickup-date"
                className={`px-4 py-2 border rounded-md ${theme === "light" ? "border-gray-300" : "dark:bg-gray-700 dark:border-gray-600"}`}
                value={searchData.pickupDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, pickupDate: e.target.value }))}
              />
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="return-date" className="mb-2 font-semibold">
                Return Date
              </label>
              <input
                type="date"
                id="return-date"
                className={`px-4 py-2 border rounded-md ${theme === "light" ? "border-gray-300" : "dark:bg-gray-700 dark:border-gray-600"}`}
                value={searchData.returnDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
              />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={yellowCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              Car Rental
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              Renting a car is like borrowing freedom for a while{" "}
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={() => {
                AOS.refreshHard();
              }}
              className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
            >
              Get Started
            </button>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Hero;

