
import React, { useState } from "react";
import carImage from "../../assets/white-car.png"; // Update the path based on your file structure
import About from "./About";

export const Home = () => {
    const [formData, setFormData] = useState({
        location: "",
        pickupDate: "",
        returnDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="bg-transparent">
            <div className="container min-h-[620px] flex flex-col justify-center items-center">
                <div className={`w-full max-w-3xl p-8 mt-8 rounded-lg shadow-lg`}>
                    <form className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex flex-col w-full sm:w-auto">
                            <label htmlFor="location" className="mb-2 font-semibold">
                                Location
                            </label>
                            <select
                                id="location"
                                name="location"
                                className={`px-4 py-2 border rounded-md`}
                                value={formData.location}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select a location
                                </option>
                                {/* Add your location options here */}
                                <option value="Location1">Location 1</option>
                                <option value="Location2">Location 2</option>
                            </select>
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
                                value={formData.pickupDate}
                                onChange={handleChange}
                            />
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
                                value={formData.returnDate}
                                onChange={handleChange}
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
                <About/>
            </div>
        </div>
       
    );
};
