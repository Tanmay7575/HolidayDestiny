

import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelsForm';

const DetailsSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
       

        {/* Hotel Name */}
        <label className="text-gray-700 text-sm font-bold">
          Name
          <input
            type="text"
            className="border rounded w-full py-2 px-4 font-normal mt-1"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </label>

        {/* City and Country */}
        <div className="flex flex-col md:flex-row gap-4">
          <label className="text-gray-700 text-sm font-bold w-full">
            City
            <input
              type="text"
              className="border rounded w-full py-2 px-4 font-normal mt-1"
              {...register("city", { required: "This field is required" })}
            />
            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
          </label>

          <label className="text-gray-700 text-sm font-bold w-full">
            Country
            <input
              type="text"
              className="border rounded w-full py-2 px-4 font-normal mt-1"
              {...register("country", { required: "This field is required" })}
            />
            {errors.country && <span className="text-red-500">{errors.country.message}</span>}
          </label>
        </div>

        {/* Description */}
        <label className="text-gray-700 text-sm font-bold">
          Description
          <textarea
            rows={6}
            className="border rounded w-full py-2 px-4 font-normal mt-1"
            {...register("description", { required: "This field is required" })}
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </label>

        {/* Price and Star Rating */}
        <div className="flex flex-col md:flex-row gap-4">
          <label className="text-gray-700 text-sm font-bold w-full">
            Price Per Night
            <input
              type="number"
              min={1}
              className="border rounded w-full py-2 px-4 font-normal mt-1"
              {...register("pricePerNight", { required: "This field is required" })}
            />
            {errors.pricePerNight && <span className="text-red-500">{errors.pricePerNight.message}</span>}
          </label>

          <label className="text-gray-700 text-sm font-bold w-full">
            Star Rating
            <select
              {...register("starRating", { required: "This field is required" })}
              className="border rounded w-full p-2 text-gray-700 font-normal mt-1"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {errors.starRating && <span className="text-red-500">{errors.starRating.message}</span>}
          </label>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
