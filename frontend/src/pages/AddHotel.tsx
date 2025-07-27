import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelsForm/ManageHotelsForm";
import { toast } from "react-toastify";
import * as apiClient from "../api-client"

const AddHotel=()=>{
    const {mutate,isPending}=useMutation<void ,Error,FormData,unknown>({
        mutationFn:apiClient.addMyHotel,
        onSuccess:()=>{
        toast.success("Hotel Saved!");
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    });
    const handleSave=(hotelFormData:FormData)=>{
          mutate(hotelFormData)
    }
  
    return (
        <ManageHotelForm onSave={handleSave} isPending={isPending} />
    )
}

export default AddHotel;