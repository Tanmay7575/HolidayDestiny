import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelsForm";

export const FacilitiesSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Facilities</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) =>
                  facilities && facilities.length > 0
                    ? true
                    : "At least one facility is required",
              })}
              className="w-4 h-4 accent-blue-500"
            />
            {facility}
          </label>
        ))}
      </div>

      {errors.facilities && (
        <span className="text-red-500 text-sm font-medium mt-2 block">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
