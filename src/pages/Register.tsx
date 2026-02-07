
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { refetchToken } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      await refetchToken();
      toast.success("User Registered Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex justify-center items-center px-4 py-10 rounded">
      <form
        className="w-full max-w-xl bg-white shadow-md rounded p-6 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>

        {/* First + Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex-1 text-gray-700 text-sm font-bold">
            First Name
            <input
              type="text"
              className="border rounded w-full py-2 px-3 mt-1 font-normal"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>

          <label className="flex-1 text-gray-700 text-sm font-bold">
            Last Name
            <input
              type="text"
              className="border rounded w-full py-2 px-3 mt-1 font-normal"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>

        {/* Email */}
        <label className="text-gray-700 text-sm font-bold">
          Email
          <input
            type="email"
            className="border rounded w-full py-2 px-3 mt-1 font-normal"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>

        {/* Password */}
        <label className="text-gray-700 text-sm font-bold">
          Password
          <input
            type="password"
            className="border rounded w-full py-2 px-3 mt-1 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>

        {/* Confirm Password */}
        <label className="text-gray-700 text-sm font-bold">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full py-2 px-3 mt-1 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </label>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-500 font-bold text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
