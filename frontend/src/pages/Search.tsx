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
    const [sortOption , setSortOption]=useState<string>("");
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
        sortOption,
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
    {/* Filter Sidebar */}
    {/* <div className="rounded-lg border border-slate-300 p-4 h-fit w-full top-10 text-sm">
      <div className="space-y-4">
        <h3 className="text-base font-semibold border-b border-slate-300 pb-3">
          Filter by:
        </h3>
        <StarRatingFilter 
        selectedStars={selectedStars} 
        onChange={handleStarsChange}
        />
        <HotelTypesFilter 
        selectedHotelTypes={selectedHotelTypes}
        onChange={handleHotelTypeChange}
        />
        <HotelFacility 
        selectedFacilities={selectFacility}
        onChange={handleHotelFacility}
        />
        <PriceFilter
             selectedPrice={selectedPrice}
             onChange={(value?:number)=> setSelectedPrice(value)}
        />
      </div>
    </div> */}
    <div className="relative w-full md:w-[250px] md:sticky md:top-10">
  {/* Toggle checkbox (hidden) */}
  <input type="checkbox" id="toggleFilters" className="peer hidden md:hidden" />

  {/* Toggle button */}
  <label
    htmlFor="toggleFilters"
    className="md:hidden inline-block bg-slate-800 text-white px-4 py-2 rounded mb-4 cursor-pointer"
  >
    Add Filters
  </label>

  {/* Filter panel */}
  <div
    className="
      peer-checked:block hidden 
      md:block rounded-lg border border-slate-300 p-4 h-fit w-full text-sm
    "
  >
    <div className="space-y-4">
      <h3 className="text-base font-semibold border-b border-slate-300 pb-3">
        Filter by:
      </h3>

      <StarRatingFilter
        selectedStars={selectedStars}
        onChange={handleStarsChange}
      />
      <HotelTypesFilter
        selectedHotelTypes={selectedHotelTypes}
        onChange={handleHotelTypeChange}
      />
      <HotelFacility
        selectedFacilities={selectFacility}
        onChange={handleHotelFacility}
      />
      <PriceFilter
        selectedPrice={selectedPrice}
        onChange={(value?: number) => setSelectedPrice(value)}
      />
    </div>
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