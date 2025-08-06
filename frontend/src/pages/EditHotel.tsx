


import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelsForm/ManageHotelsForm";
import { toast } from "react-toastify";

const EditHotel = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  if (!hotelId) return <div className="text-center py-8">Hotel ID not found</div>;

  const {
    data: hotel,
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

  if (isPending) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error fetching hotel</div>;

  return (
    <div className="px-4 sm:px-8 md:px-10 lg:px-20 py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Edit Hotel</h1>
      <ManageHotelForm hotel={hotel} onSave={handleSave} isPending={isPending} />
    </div>
  );
};

export default EditHotel;
