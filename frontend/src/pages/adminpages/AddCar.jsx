import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const schema = yup
  .object({
    carName: yup.string().required(),
    carModel: yup.string().required(),
    carCompany: yup.string().required(),
    carCategory: yup.string().required(),
    carEngine: yup.string().required(),
    transmission: yup.string().required(),
    carMileage: yup.string().required(),
    carSeatCapacity: yup.string().required(),
    carFuelType: yup.string().required(),
    rentalPriceCharge: yup.string().required(),
    office: yup.string().required(),
  })
  .required();

const AddCar = () => {
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const officeList = async () => {
      try {
        const res = await axiosInstance.get("/admin/getAllOffices");
        const data = res.data;
        setOffices(data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };
    officeList();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("carName", data.carName);
    formData.append("carModel", data.carModel);
    formData.append("carCompany", data.carCompany);
    formData.append("carCategory", data.carCategory);
    formData.append("carEngine", data.carEngine);
    formData.append("transmission", data.transmission);
    formData.append("carMileage", data.carMileage);
    formData.append("carSeatCapacity", data.carSeatCapacity);
    formData.append("carFuelType", data.carFuelType);
    formData.append("rentalPriceCharge", data.rentalPriceCharge);
    formData.append("office", data.office);
    formData.append("carPicture", data.carPicture[0]);

    try {
      const res = await axiosInstance.post(
        "/admin/add-cars",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/admin/carlist", { replace: true });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 rounded-md border p-6">
        <input
          {...register("carName")}
          type="text"
          placeholder="Car name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carName && <p>{errors.carName.message}</p>}

        <input
          {...register("carModel")}
          type="text"
          placeholder="Car Model"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carModel && <p>{errors.carModel.message}</p>}

        <input
          {...register("carCompany")}
          type="text"
          placeholder="Car Company"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carCompany && <p>{errors.carCompany.message}</p>}

        <input
          {...register("carCategory")}
          type="text"
          placeholder="Car Category"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carCategory && <p>{errors.carCategory.message}</p>}

        <input
          {...register("carEngine")}
          type="text"
          placeholder="Car Engine"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carEngine && <p>{errors.carEngine.message}</p>}

        <input
          {...register("transmission")}
          type="text"
          placeholder="Transmission"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.transmission && <p>{errors.transmission.message}</p>}

        <input
          {...register("carMileage")}
          type="text"
          placeholder="Car Mileage"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carMileage && <p>{errors.carMileage.message}</p>}

        <input
          {...register("carSeatCapacity")}
          type="text"
          placeholder="Car Seat Capacity"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carSeatCapacity && <p>{errors.carSeatCapacity.message}</p>}

        <input
          {...register("carFuelType")}
          type="text"
          placeholder="Car Fuel Type"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carFuelType && <p>{errors.carFuelType.message}</p>}

        <input
          {...register("rentalPriceCharge")}
          type="text"
          placeholder="Rental Price Charge"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.rentalPriceCharge && <p>{errors.rentalPriceCharge.message}</p>}

        <input
          {...register("carPicture")}
          type="file"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.carPicture && <p>{errors.carPicture.message}</p>}

        <select {...register("office")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select Office City</option>
          {offices.map((office, index) => (
            <option key={index} value={office.city}>
              {office.city}
            </option>
          ))}
        </select>
        {errors.office && <p>{errors.office.message}</p>}

        <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AddCar;
