import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "./ManageHotelsForm"


const ImageSection = () => {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div>
          <h2 className="text-2xl font-bold mb-3">Images</h2>
          <div className="border rounded p-4 flex flex-col gap-4">
            <input type="file"
            multiple
            accept="image/*"
            className=" text-gray-700 font-normal rounded text-gray-700"
             {...register("imageFiles",{
                validate:(imageFiles)=>{
                      const totalLength=imageFiles.length;
                      if(totalLength === 0){
                        return "At Least one image should be Added"
                      }
                      if(totalLength > 6){
                        return "Total number of images cannot be more than 6"
                      }
                      return true;
                }
            })}/>
          </div>
          {errors.imageFiles && (
            <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
          ) }
    </div>
  )
}

export default ImageSection