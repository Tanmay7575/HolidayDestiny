import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { toast } from "react-toastify";

const MyHotel = () => {
  const queryClient = useQueryClient();

  const { data: hotelData, isLoading, error } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
    refetchOnMount: true,
  });

  const deleteMutation = useMutation({
    mutationFn: apiClient.deleteMyHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyHotels"] });
      toast.success("Hotel deleted");
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });

  const handleDelete = (hotelId: string) => {
    const formData = new FormData();
    formData.append("hotelId", hotelId);
    deleteMutation.mutate(formData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching hotels</p>;
  
  return (
    <div className="py-6 px-4 md:px-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Add Hotel
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        { Array.isArray(hotelData) &&hotelData.length > 0 && hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="border border-slate-300 rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col gap-2 flex-grow">
              <h2 className="text-xl font-bold">{hotel.name}</h2>
              <p className="text-gray-700 text-sm">
                {hotel.city}, {hotel.country}
              </p>
              <p className="text-sm line-clamp-3">{hotel.description}</p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹{hotel.pricePerNight} / night</span>
                <span>{hotel.starRating}★</span>
              </div>
              <div className="mt-auto flex justify-between gap-2 pt-4">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(hotel._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
