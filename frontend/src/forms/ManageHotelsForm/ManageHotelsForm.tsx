import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";


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
};

type Props={
  onSave:(HotelFormData:FormData)=> void 
 
}

const ManageHotelForm = ({onSave}: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit ,reset} = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
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
       Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
         formData.append(`imageFiles`,imageFile);
       });

       onSave(formData);
       reset();
  });

  return (
    <div className="flex  justify-center rounded gap-10">
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
             Save
              
            </button>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};
export default ManageHotelForm;
