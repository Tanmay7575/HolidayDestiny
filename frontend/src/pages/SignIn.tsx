import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import * as apiClient from "../api-client"
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData={
    email:string,
    password:string;
}
  const SignIn=()=>{
    const {refetchToken}=useAppContext();
      const navigate=useNavigate();
      const { register,handleSubmit,formState:{errors}} = useForm<SignInFormData>();

      const location=useLocation();
    
      const mutation = useMutation({
        mutationFn: apiClient.SignIn,
        onSuccess:async () => {
           await refetchToken();
        toast.success("User SignIn Successfully");
        navigate(location.state?.from?.pathname || "/");
        },
        onError: (error) => {
         toast.error(error.message);
        },
      });
    
        const onSubmit=handleSubmit((data)=>{
          mutation.mutate(data);
  })
  return (
      <div className="flex justify-center rounded">
        <form action="" className="flex flex-col" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>  
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
            {...register("password", { required: "This field is required",minLength:{value:6,message:"password is Incorrect"}})}
          />
           {errors.password && (
             <span className="text-red-500">{errors.password.message}</span>
           )}
        </label>
         <span>
          <span className="text-sm ">
            Not Registered? <Link className="underline" to="/register">Create an acount here</Link>
          </span>
            <button type="submit" className="rounded bg-blue-600 text-white p-2 m-4 font-bold hover:bg-blue-500 text-xl">
                Login
            </button>
        </span>
        </form>
      </div>
  )
}

export default SignIn;