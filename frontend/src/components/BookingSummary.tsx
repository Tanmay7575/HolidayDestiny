import type { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberofNights: number;
  hotel: HotelType;
};

export const BookingSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberofNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-xl border border-slate-300 p-4 shadow-md bg-white md:p-6 h-fit text-sm md:text-base">
      <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
        🧾 Your Booking Summary
      </h2>

      <div>
        <p className="text-gray-600"> Location:</p>
        <p className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:flex sm:justify-between border-y py-2">
        <div>
          <p className="text-gray-600">Check-in</p>
          <p className="font-bold">{checkIn.toDateString()}</p>
        </div>
        <div>
          <p className="text-gray-600"> Check-out</p>
          <p className="font-bold">{checkOut.toDateString()}</p>
        </div>
      </div>

      <div>
        <p className="text-gray-600">Stay Duration:</p>
        <p className="font-bold">{numberofNights} nights</p>
      </div>

      <div>
        <p className="text-gray-600">Guests:</p>
        <p className="font-bold">
          {adultCount} adult(s){childCount > 0 ? ` & ${childCount} child` : ""}
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
