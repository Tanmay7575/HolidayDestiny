import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacility from "../components/HotelFacility";
import PriceFilter from "../components/PriceFilter";

const Search= () =>{

    const search = useSearchContext();
    const [page,setPage]=useState<number>(1);
    const [selectedStars,setSelectedStars]=useState<string[]>([]);
    const [selectedHotelTypes,setSelectedHotelTypes]=useState<string[]>([]);
    const [selectFacility,setSelectFacility]=useState<string[]>([]);
    const [selectedPrice, setSelectedPrice]=useState<number | undefined>();

    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars: selectedStars,
        types:selectedHotelTypes,
        facilities:selectFacility,
        maxPrice:selectedPrice?.toString(),
   
    }
    const {data:hotelData}=useQuery({
        queryKey:["SearchHotels",searchParams],
        queryFn:()=>apiClient.searchHotels(searchParams),
    });

    const handleStarsChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      const starRating=event.target.value;
      setSelectedStars((prevStars)=>
      event.target.checked
      ?[...prevStars,starRating]
      :prevStars.filter((star)=>star !== starRating)
    )
    }

    
    const handleHotelTypeChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      const hotelType=event.target.value;
      setSelectedHotelTypes((prevStars)=>
      event.target.checked
      ?[...prevStars,hotelType]
      :prevStars.filter((hotel)=>hotel !== hotelType)
    )
    }
     const handleHotelFacility=(event: React.ChangeEvent<HTMLInputElement>)=>{
      const hotelFacility=event.target.value;
      setSelectFacility((prevFacility)=>
      event.target.checked
      ?[...prevFacility,hotelFacility]
      :prevFacility.filter((facility)=>facility !== hotelFacility)
    )
    }
  
    return (
  <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 px-20">
  
  {/* Toggle Button & Filter Panel for md and smaller */}
<div className="block lg:hidden w-full mb-4">
  {/* Hidden checkbox to toggle */}
  <input type="checkbox" id="toggleFilter" className="peer hidden" />

  {/* Button (Label) */}
  <label
    htmlFor="toggleFilter"
    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg inline-block"
  >
    Show Filters
  </label>

  {/* Filter panel (only visible when checkbox is checked) */}
  <div className="mt-4 hidden peer-checked:block rounded-lg border border-slate-300 p-4 text-sm">
    <div className="space-y-4">
      <h3 className="text-base font-semibold border-b border-slate-300 pb-3">Filter by:</h3>
      <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
      <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
      <HotelFacility selectedFacilities={selectFacility} onChange={handleHotelFacility} />
      <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
    </div>
  </div>
</div>

{/* Always visible on large screens and above */}
<div className="hidden lg:block rounded-lg border border-slate-300 p-4 w-full text-sm">
  <div className="space-y-4">
    <h3 className="text-base font-semibold border-b border-slate-300 pb-3">Filter by:</h3>
    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
    <HotelFacility selectedFacilities={selectFacility} onChange={handleHotelFacility} />
    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
  </div>
</div>

    {/* Hotel List */}
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">
          {hotelData?.pagination.total} Hotels Found
          {search.destination ? ` in ${search.destination}` : ""}
        </span>
      </div>

      {hotelData?.data.map((hotel) => (
        <SearchResultsCard key={hotel._id} hotel={hotel} />
      ))}
      <div>
        <Pagination
         page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page)=>setPage(page)}
          />
      </div>
    </div>
  </div>
);

}

export default Search;
