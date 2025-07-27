import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelsForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const exisitingImageUrl=watch("imageUrls");
  const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,
    imageurl:string
  )=>{
      event.preventDefault();
      setValue("imageUrls",exisitingImageUrl.filter((url)=>url !== imageurl))
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {exisitingImageUrl && (
          <div className="grid grid-cols-6 gap-4">
            {exisitingImageUrl.map((url,index)=>(
              <div key={index} className="relative group">
                <img src={url} className="min-h-full object-cover"  />
                <button onClick={(event)=> handleDelete(event,url)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className=" text-gray-700 font-normal rounded text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (exisitingImageUrl?.length || 0);

              if (totalLength === 0) {
                return "At Least one image should be Added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection;
