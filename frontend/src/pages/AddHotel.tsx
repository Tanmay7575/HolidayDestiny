import { useMutation, useQueryClient } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelsForm/ManageHotelsForm";
import { toast } from "react-toastify";
import * as apiClient from "../api-client"
import { useNavigate } from "react-router-dom";


const AddHotel=()=>{
   const navigate = useNavigate();
const queryClient = useQueryClient();

const { mutate, isPending } = useMutation<void, Error, FormData, unknown>({
  mutationKey: ["AddMyHotel"],
  mutationFn: apiClient.addMyHotel,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["fetchMyHotels"] });
    toast.success("Hotel Saved!");
    navigate("/my-hotels");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

    const handleSave=(hotelFormData:FormData)=>{
          mutate(hotelFormData)
    }
  
    return (
  <div>
       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Add Hotel</h1>
     <ManageHotelForm onSave={handleSave} isPending={isPending} />
  </div>
       
    )
}

export default AddHotel;