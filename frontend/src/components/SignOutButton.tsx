import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton=()=>{
    const navigate=useNavigate();
    const {refetchToken}=useAppContext();
   

    const mutation =useMutation({
        mutationFn: apiClient.signOut,
        onSuccess:async()=>{
     await refetchToken();
        toast.success("Sign Out Successfully");
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    });

    const handleClick=()=>{
        mutation.mutate();
        navigate("/");
    }
    return (
        <button onClick={handleClick}  className="flex items-center bg-white text-gray-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500">
            Sign Out
        </button>
    )
}
export default SignOutButton;