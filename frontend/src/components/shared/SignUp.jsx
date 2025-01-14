
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"; 
import { saveUser } from "../../redux/features/userSlice";
import { axiosInstance } from "../../config/axiosInstance";

export const SignUp = ({ role = "user" }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [profilePicture, setProfilePicture] = useState(null);
    const user = {
        role: "user",
        signup_api: "/user/signup",
        profile_route: "/user/profile",
        signin_route: "/user/signin",
    };

    // const onSubmit = async (data) => {
    //     try {
    //         const response = await axiosInstance({
    //             method: "POST",
    //             url: user.signup_api,
    //             data,
    //         });

    //         dispatch(saveUser(response.data));  
    //         toast.success("Sign-up success");
    //         navigate(user.signin_route);
    //     } catch (error) {
    //         toast.error("Sign-up failed");
    //         console.log(error);
    //     }
    // };
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("address", data.address);
            formData.append("city", data.city);
            formData.append("state", data.state);
            formData.append("country", data.country);
            formData.append("contactNumber", data.contactNumber);
            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            const response = await axiosInstance({
                method: "POST",
                url: user.signup_api,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(saveUser(response.data));  
            toast.success("Sign-up success");
            navigate(user.signin_route);
        } catch (error) {
            toast.error("Sign-up failed");
            console.log(error);
        }
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now! {role}</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                        aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" {...register("firstName", { required: "First Name is required" })} placeholder="First Name" className="input input-bordered" />
                            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" {...register("lastName", { required: "Last Name is required" })} placeholder="Last Name" className="input input-bordered" />
                            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })} placeholder="Email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 8, message: "Password must be at least 8 characters" }
                            })} placeholder="Password" className="input input-bordered" />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>

                      
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Picture</span>
                            </label>
                            <input  {...register("profilePicture")}
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setProfilePicture(e.target.files[0])}
                                className="input input-bordered"
                            />
                        </div>






      

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" {...register("address", { required: "Address is required" })} placeholder="Address" className="input input-bordered" />
                            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text" {...register("city", { required: "City is required" })} placeholder="City" className="input input-bordered" />
                            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">State</span>
                            </label>
                            <input type="text" {...register("state", { required: "State is required" })} placeholder="State" className="input input-bordered" />
                            {errors.state && <span className="text-red-500">{errors.state.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Country</span>
                            </label>
                            <input type="text" {...register("country", { required: "Country is required" })} placeholder="Country" className="input input-bordered" />
                            {errors.country && <span className="text-red-500">{errors.country.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact Number</span>
                            </label>
                            <input type="text" {...register("contactNumber", { 
                                required: "Contact Number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Invalid Contact Number"
                                }
                            })} placeholder="Contact Number" className="input input-bordered" />
                            {errors.contactNumber && <span className="text-red-500">{errors.contactNumber.message}</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <div className="form-control mt-2">
                            <label className="label">
                                <Link to={user.signin_route}>Already have an account? Sign in</Link>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

