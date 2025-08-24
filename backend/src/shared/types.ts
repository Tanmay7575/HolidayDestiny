export type HotelType={
    _id:string;
    userId:string;
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount:number;
    childCount:number;
    facilities:string[];
    pricePerNight:number;
    starRating:number;
    imageUrls:string[];
    lastUpdated:Date;
    newProperty:string;
    bookings: BookingType[];
    reviews:ReviewType[];
}

export type HotelSearchResponse={
    data:HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}


export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type BookingType = {
    _id: string;
    userId: string;
    firstName: string;
    lastName:string
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
}

export type ReviewType={
    _id:string;
    userId:string;

    review:string;
    rating:number;
}

export type PaymentIntentResponse= {
    paymentIntendCard: string;
    clientSecret: string;
    totalCost: number;
    paymentIntentId: string;
}