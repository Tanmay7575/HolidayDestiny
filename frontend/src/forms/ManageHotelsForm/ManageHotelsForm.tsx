import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import type { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";



export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls:string[];
};

type Props={
  hotel?:HotelType;
  onSave:(HotelFormData:FormData)=> void 
  isPending:boolean,
}

const ManageHotelForm = ({onSave,isPending,hotel}: Props) => {

  const formMethods = useForm<HotelFormData>();
  const { handleSubmit ,reset} = formMethods;
  
  useEffect(()=>{
    reset(hotel);
  },[hotel,reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
      const formData = new FormData();
    if(hotel){
      formData.append("hotelId",hotel._id)
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
   formData.append("pricePerNight",formDataJson.pricePerNight.toString());
      formData.append("starRating",formDataJson.starRating.toString());
      
formDataJson.facilities.forEach((facility,index)=>{
        formData.append(`facilities[${index}]`,facility)
  }) 
  
  //[image1.jpg,image2,jpg,image3,jpg]
  //imageUrls=[image.jpg]
  if(formDataJson.imageUrls){
    formDataJson.imageUrls.forEach((url,index)=>{
      formData.append(`imageUrls[${index}]`,url);
    })
  } 
       Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
         formData.append(`imageFiles`,imageFile);
       });

       onSave(formData);

       
  });

  return (
    <div className="flex justify-center rounded gap-10">
      <FormProvider {...formMethods}>
        <form action="" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImageSection />
          <span className="flex justify-end m-4">
            <button
           
            type="submit"
              className=" rounded bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
             {isPending ?"Loading...":"Save"}
              
            </button>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};
export default ManageHotelForm;
