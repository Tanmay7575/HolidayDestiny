import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import * as apiClient from '../api-client';

import { toast} from 'react-toastify';
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
  const navigate=useNavigate();
  const {refetchToken}=useAppContext();
  const { register ,watch,handleSubmit,formState:{errors}} = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async() => {
   await refetchToken();
    toast.success("User Register Successfully");
    navigate("/");
    },
    onError: (error) => {
     toast.error(error.message);
    },
  });

  const onSubmit=handleSubmit((data)=>{
          mutation.mutate(data);
  })
  return (
     <div className="flex justify-center bg-gray-100 rounded">
    <form action="" className="flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label htmlFor="" className="text-gray-700 text-em font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
           />
           {errors.firstName && (
             <span className="text-red-500">{errors.firstName.message}</span>
           )}
          
        </label>

        <label htmlFor="" className="text-gray-700 text-em font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
           {errors.lastName && (
             <span className="text-red-500">{errors.lastName.message}</span>
           )}
        </label>
      </div>
       <label htmlFor="" className="text-gray-700 text-em font-bold ">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-5 font-normal"
            {...register("email", { required: "This field is required" })}
          />
           {errors.email && (
             <span className="text-red-500">{errors.email.message}</span>
           )}
        </label>

         <label htmlFor="" className="text-gray-700 text-em font-bold ">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-5 font-normal"
            {...register("password", { required: "This field is required",minLength:{value:6,message:"password must be of 6 character"}})}
          />
           {errors.password && (
             <span className="text-red-500">{errors.password.message}</span>
           )}
        </label>

        

         <label htmlFor="" className="text-gray-700 text-em font-bold ">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full py-1 px-5 font-normal"
            {...register("confirmPassword", {
                validate:(val)=>{
                    if(!val){
                        return "This field is required";
                    }else if(watch("password") !== val){
                       return "Your passwords don not match";
                    }
                }
             })}
          />
           {errors.confirmPassword && (
             <span className="text-red-500">{errors.confirmPassword.message}</span>
           )}
        </label>
        <span>
            <button type="submit" className="rounded bg-blue-600 text-white p-2 m-4 font-bold hover:bg-blue-500 text-xl">
                Submit
            </button>
        </span>
    </form>
    </div>
  );
};

export default Register;
