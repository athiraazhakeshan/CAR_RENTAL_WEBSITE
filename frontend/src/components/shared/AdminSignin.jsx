import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';




    export const AdminSignin = ({ role = "admin" }) => {
        const { register, handleSubmit } = useForm();
        const navigate = useNavigate();
    
        const admin = {
            role: "admin",
            login_api: "/admin/adminlogin",
            profile_route: "/admin/profile",
        };
     
    
        // console.log(user, "=====user");
    
        const onSubmit = async (data) => {
            try {
                const response = await axiosInstance({
                    method: "POST",
                    url: admin.login_api,
                    data,
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json'
                   }
                
                });
                // const response = await axiosInstance({ method: "POST", url: user.login_api, data });
                console.log(response, "====response");
                toast.success("Log-in success");
                navigate(admin.profile_route);
            } catch (error) {
                toast.error("Log-in failed");
                console.log(error);
            }
        };
    
        return (
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now! {role} </h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                            aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };