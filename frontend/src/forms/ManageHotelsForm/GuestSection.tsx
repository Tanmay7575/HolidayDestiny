// import { useFormContext } from "react-hook-form"
// import type { HotelFormData } from "./ManageHotelsForm"



// const GuestSection = () => {
//     const {register,formState:{errors}}=useFormContext<HotelFormData>()
//   return (
//     <div className="">
//          <h2 className="text-2xl font-bold mb-3">Guests</h2>
//          <div className="grid grid-cols-2 p-6 bg-gray-300 rounded-md gap-5">
//         <label htmlFor="" className="text-gray-700 text-em font-bold ">
//           Adults
//           <input
//             type="number"
//             min={0}
//             className="border rounded w-full py-1 px-5 font-normal"
//             {...register("adultCount", { required: "This field is required" })}
//           />
//            {errors.adultCount && (
//              <span className="text-red-500">{errors.adultCount.message}</span>
//            )}
//         </label>   

//                 <label htmlFor="" className="text-gray-700 text-em font-bold ">
//           Children
//           <input
//             type="number"
//             min={0}
//             className="border rounded w-full py-1 px-5 font-normal"
//             {...register("childCount", { required: "This field is required" })}
//           />
//            {errors.childCount && (
//              <span className="text-red-500">{errors.childCount.message}</span>
//            )}
//         </label>
//         </div>   
//     </div>
//   )
// }

// export default GuestSection


import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelsForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Guests</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-gray-100 p-6 rounded-md">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            id="adultCount"
            type="number"
            min={0}
            className="border mt-1 rounded w-full py-2 px-4 font-normal focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            id="childCount"
            type="number"
            min={0}
            className="border mt-1 rounded w-full py-2 px-4 font-normal focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
