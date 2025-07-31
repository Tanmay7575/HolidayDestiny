import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney ,BiHotel, BiStar} from "react-icons/bi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";



const MyHotel = () => {
  const queryClient = useQueryClient();
    const {data:hotelData,isLoading,error}=useQuery({
  queryKey: ["fetchMyHotels"],
  queryFn: apiClient.fetchMyHotels,
  refetchOnMount: true,
});
  
const deleteMutation=useMutation({
  mutationFn:apiClient.deleteMyHotel,
  onSuccess:() =>{
     queryClient.invalidateQueries({
      queryKey:["fetchMyHotels"]
    });
    toast.success("hotel deleted..");
  },
  onError:() =>{
       toast.error("Falied to delete")
  }
  
});

const handleDelete=(hotelId:string)=>{
  const formData=new FormData();
    formData.append("hotelId",hotelId);
    deleteMutation.mutate(formData);
}
  
if(isLoading) return <p>Loading....</p>
if(error) return <p>Error...</p>

    if(!hotelData){
        return <span>No Hotels Data</span>
    }

  return (
    <div className=" py-5 px-20">
    <div className="flex justify-between items-center py-5 px-20">
  <h1 className="text-3xl font-bold">My Hotels</h1>
  
  <Link
    to="/add-hotel"
    className="bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded hover:bg-blue-500 transition"
  >
    Add Hotel
  </Link>
</div>
       <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel)=>(
             <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                 <h2 className="text-2xl font-bold">{hotel.name}</h2>
                 <div className="whitespace-pre-line">{hotel.description}</div>
                 <div className="grid grid-cols-5 gap-2">
                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                       <BsMap className="mr-2 text-blue-500 w-5 h-5" />
                        {hotel.city},{hotel.country}
                    </div>
                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                       <BsBuilding className="mr-2 text-blue-500 w-5 h-5" />
                        {hotel.type}
                    </div>
                     <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                       <BiMoney className="mr-2 text-blue-500 w-5 h-5" />
                        {hotel.pricePerNight} per night
                    </div>
                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                       <BiHotel className="mr-2 text-blue-500 w-5 h-5" />
                        {hotel.adultCount} adult, {hotel.childCount} child
                    </div>
                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                       <BiStar className="mr-2 text-blue-500 w-5 h-5" />
                        {hotel.starRating} Star Rating
                    </div>
                 </div>
                 <span className="flex justify-end">
                    <button className="bg-red-600 text-white text-xl font-bold px-4 py-2 rounded hover:bg-red-500 transition" onClick={()=>handleDelete(hotel._id)}>Delete</button>
                  <Link className="bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded hover:bg-blue-500 transition"to={`/edit-hotel/${hotel._id}`}>Edit Details</Link>
                 </span>
             </div>
        ))}
       </div>
     </div>
)
};


export default MyHotel;
