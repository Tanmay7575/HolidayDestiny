import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import type { HotelType } from "../../../backend/src/shared/types";

const MyBooking = () => {
  const { data: hotels } = useQuery<HotelType[]>({
    queryKey: ["fetchMyHotel"],
    queryFn: apiClient.fetchMyBookings,
  });

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5 p-4">
      <h1 className="text-3xl font-bold text-center">My Bookings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="rounded-xl overflow-hidden shadow-md border border-slate-200"
          >
            {/* Image with overlay */}
            <div className="relative h-56 sm:h-64 md:h-72">
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h2 className="text-lg font-semibold">{hotel.name}</h2>
                <p className="text-sm">{hotel.city}, {hotel.country}</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white p-4 space-y-3">
              {hotel.bookings.map((booking, index) => (
                <div key={index} className="rounded-lg border p-3 bg-slate-50 space-y-2">
                  <div>
                    <span className="font-medium">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} –{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Guests: </span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
