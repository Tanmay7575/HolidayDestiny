

import React, { useState } from "react";
import type { HotelType } from "../../../backend/src/shared/types";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


type Props = {
  hotel: HotelType;
};



const HotelCard: React.FC<Props> = ({ hotel }) => {
  const [liked, setLiked] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <StarSolid key={i} className="h-5 w-5 text-yellow-400" />
        ) : (
          <StarOutline key={i} className="h-5 w-5 text-gray-300" />
        )
      );
    }


    return (
      <div className="flex items-center gap-1 mt-1">
        {stars}
        <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col relative">
      {/* Heart Toggle Button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:scale-110 transition"
        aria-label="Toggle Like"
      >
        {liked ? (
          <HeartSolid className="h-6 w-6 text-red-500" />
        ) : (
          <HeartOutline className="h-6 w-6 text-gray-400" />
        )}
      </button>

      {/* Hotel Image */}
      <img
        src={hotel.imageUrls[0]}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{hotel.name}</h2>
          <p className="text-sm text-gray-500">{hotel.city}</p>
          {renderStars(hotel.starRating)}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold">₹{hotel.pricePerNight}</span>
           
           <Link
              to={`/detail/${hotel._id}`}
            className="bg-indigo-500 text-white text-sm px-3 py-1 rounded hover:bg-indigo-600 transition"
            >
            Book
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

