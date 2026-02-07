

import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import type { HotelType } from "../../../backend/src/shared/types";
import HotelCard from "../components/HotelCard";

const Home = () => {
  const { data: hotelData, isLoading, isError } = useQuery<HotelType[], Error>({
    queryKey: ["fetchHotelByCity"],
    queryFn: apiClient.getHotelByCity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading hotels.</div>;

  return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotelData?.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Home;


