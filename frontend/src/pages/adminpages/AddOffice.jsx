import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from '../../config/axiosInstance'; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pin: yup.string().required("Pin is required"),
  contact: yup.string().required("Contact is required"),
}).required();

const AddOffice = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const res = await axiosInstance.post(
        "admin/addOfficeLocation",
        data, // Directly sending JSON data
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Using application/json
          },
        }
      );
      console.log("Response:", res.data);
      navigate("/admin/offices");
    } catch (error) {
      console.error("Error adding office:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 rounded-md border p-6">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.address && <p>{errors.address.message}</p>}

        <input
          {...register("city")}
          type="text"
          placeholder="City"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.city && <p>{errors.city.message}</p>}

        <input
          {...register("state")}
          type="text"
          placeholder="State"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.state && <p>{errors.state.message}</p>}

        <input
          {...register("country")}
          type="text"
          placeholder="Country"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.country && <p>{errors.country.message}</p>}

        <input
          {...register("pin")}
          type="text"
          placeholder="Pin"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.pin && <p>{errors.pin.message}</p>}

        <input
          {...register("contact")}
          type="text"
          placeholder="Contact"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.contact && <p>{errors.contact.message}</p>}

        <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      </form>
    </div>
  );
};

export default AddOffice;
