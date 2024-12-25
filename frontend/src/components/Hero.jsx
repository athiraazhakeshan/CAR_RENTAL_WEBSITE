import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import AOS from "aos";
import * as yup from "yup";
import "aos/dist/aos.css"; // Add this import to include AOS styles
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import About from "../pages/userpages/About";
import { useSearch } from "./context/SearchContext";

const schema = yup.object({
  officeLocation: yup.string().required(),
}).required();

export const Hero = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);
  const navigate = useNavigate();
  const [offices, setOffice] = useState([]);
  const { searchData, setSearchData } = useSearch();

  // Fetch office locations on initial render
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

    // Initialize AOS on component mount
    AOS.init();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    // Set the location in the search data context
    setSearchData({
      location: data.officeLocation,
      pickupDate: searchData.pickupDate,
      returnDate: searchData.returnDate
    });
  
    // Pass the location in the URL path
    // navigate(`/user/carsbylocation/${officeLocation}`);  // Ensure the dynamic part is passed correctly
    // navigate(`/user/carsbylocation/${city}`, { state: { location: city } });
    navigate(`/user/carsbylocation/${data.officeLocation}`);


  };
  
  

  const uniqueCities = [...new Set(offices.map(office => office.city))];

  return (
    <div className="overflow-x-hidden bg-white text-black">
      <div className="container min-h-[620px] flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl p-8 mt-8 rounded-lg shadow-lg bg-white text-black">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="location" className="mb-2 font-semibold">
                Location
              </label>
              <select
                id="location"
                className="px-4 py-2 border rounded-md border-gray-300"
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
                className="px-4 py-2 border rounded-md border-gray-300"
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
                className="px-4 py-2 border rounded-md border-gray-300"
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

        <div>
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
              <p>
                Get Started
              </p>
            </div>
            <div className="w-5/12">
              <img className="w-full" src={car} alt="car-image" />
            </div>
          </main>
        </div>
      </div>
      
      {/* About Section */}
      <div>
        <About />
      </div>
    </div>
  );
};
