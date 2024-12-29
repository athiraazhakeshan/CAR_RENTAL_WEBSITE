// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux"; 
// import { saveUser } from "../../redux/features/userSlice";
// import { axiosInstance } from "../../config/axiosInstance";

// export const SignIn = ({ role = "user" }) => {
//     const { register, handleSubmit } = useForm();
//     const navigate = useNavigate();
//     const dispatch = useDispatch(); 

//     const user = {
//         role: "user",
//         login_api: "/user/signin",
//         profile_route: "/user/profile",
//         signup_route: "signup",
//     };

//     const onSubmit = async (data) => {
//         try {
//             const response = await axiosInstance({
//                 method: "POST",
//                 url: user.login_api,
//                 data,
//             });

//             dispatch(saveUser(response.data));  // Save the user to Redux state
//             toast.success("Log-in success");
//             navigate(user.profile_route); // Navigate to the user's profile route
//         } catch (error) {
//             toast.error("Log-in failed");
//             console.log(error);
//         }
//     };

//     return (
//         <div className="hero bg-base-200 min-h-screen">
//             <div className="hero-content flex-col lg:flex-row-reverse">
//                 <div className="text-center lg:text-left">
//                     <h1 className="text-5xl font-bold">Login now! {role}</h1>
//                     <p className="py-6">
//                         Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
//                         aut repudiandae et a id nisi.
//                     </p>
//                 </div>
//                 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                     <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email</span>
//                             </label>
//                             <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input
//                                 type="password"
//                                 {...register("password")}
//                                 placeholder="password"
//                                 className="input input-bordered"
//                                 required
//                             />
//                             <label className="label">
//                                 <Link to={user.signup_route}>new User ?</Link>
//                             </label>
//                         </div>
//                         <div className="form-control mt-6">
//                             <button className="btn btn-primary">Login</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };


import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";
import { axiosInstance } from "../../config/axiosInstance";
import axios from "axios";

export const SignIn = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    role: "user",
    login_api: "user/signin",
    profile_route: "/user/profile",
    signup_route: "signup",
  };

  const onSubmit = async (data) => {
    try {
        const response = await axiosInstance({
            method: "post",
            url: user.login_api,
            data,
        });

        const userData = response.data.user;  // Get the full user object from the API response
        const token = response.data.token;    // Get the token from the API response

        // Save the full user object and token to Redux state
        dispatch(saveUser({ ...userData, token }));

        // Store the full user object and token in localStorage
        localStorage.setItem('user', JSON.stringify(userData));  // Save the full user data
        localStorage.setItem('token', token);  // Save the token

        console.log("User Data:", userData);  // Optional: Log user data to verify

        toast.success("Log-in success");
        navigate(user.profile_route);  // Navigate to the user's profile route
    } catch (error) {
        toast.error("Log-in failed");
        console.log(error);
    }
};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now! {role}</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
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
              <label className="label">
                <Link to={user.signup_route}>new User ?</Link>
              </label>
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
