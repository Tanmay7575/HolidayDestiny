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
   <div className="w-full md:max-w-md mx-auto grid gap-5 rounded-2xl border border-slate-200 p-5 shadow-lg bg-white text-sm md:text-base h-fit w">
  <h2 className="text-lg font-semibold text-blue-700 border-b pb-3 flex items-center gap-2">
    🧾 <span>Your Booking Summary</span>
  </h2>

  <div>
    <p className="text-gray-500 text-sm">Location:</p>
    <p className="font-semibold text-slate-800">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</p>
  </div>

  <div className="grid sm:grid-cols-2 gap-4 border-y py-3">
    <div>
      <p className="text-gray-500 text-sm">Check-in</p>
      <p className="font-semibold text-slate-800">{checkIn.toDateString()}</p>
    </div>
    <div>
      <p className="text-gray-500 text-sm">Check-out</p>
      <p className="font-semibold text-slate-800">{checkOut.toDateString()}</p>
    </div>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Stay Duration:</p>
    <p className="font-semibold text-slate-800">{numberofNights} night(s)</p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Guests:</p>
    <p className="font-semibold text-slate-800">
      {adultCount} adult(s){childCount > 0 ? ` & ${childCount} child` : ""}
    </p>
  </div>
</div>


  );
};

export default BookingSummary;
