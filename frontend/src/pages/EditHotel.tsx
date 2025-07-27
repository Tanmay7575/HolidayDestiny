import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelsForm/ManageHotelsForm";
import { toast } from "react-toastify";

const EditHotel = () => {

  const { hotelId } = useParams<{ hotelId: string }>();

  if (!hotelId) return <div>Hotel ID not found</div>;

  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchMyHotelById", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      toast.success("Hotel updated successfully.");
    },
    onError: () => {
      toast.error("An error occurred while updating the hotel.");
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
   
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching hotel</div>;

  return (
    <div className="px-10">
      <ManageHotelForm hotel={hotel} onSave={handleSave} isPending={isPending} />
    </div>
  );
};

export default EditHotel;
