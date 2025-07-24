import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "./ManageHotelsForm"



const GuestSection = () => {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div className="">
         <h2 className="text-2xl font-bold mb-3">Guests</h2>
         <div className="grid grid-cols-2 p-6 bg-gray-300 rounded-md gap-5">
        <label htmlFor="" className="text-gray-700 text-em font-bold ">
          Adults
          <input
            type="number"
            min={0}
            className="border rounded w-full py-1 px-5 font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
           {errors.adultCount && (
             <span className="text-red-500">{errors.adultCount.message}</span>
           )}
        </label>   

                <label htmlFor="" className="text-gray-700 text-em font-bold ">
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full py-1 px-5 font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
           {errors.childCount && (
             <span className="text-red-500">{errors.childCount.message}</span>
           )}
        </label>
        </div>   
    </div>
  )
}

export default GuestSection