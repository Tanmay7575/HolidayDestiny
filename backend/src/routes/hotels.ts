import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
import { runInContext } from "vm";
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_kEY as string);

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/hotels",async(req:Request,res:Response)=>{
        try {
            const hotels=await Hotel.find();   
            if(!hotels){
              res.status(400).json({message:"Hotels not found"});
            }
            return res.json(hotels);
        } catch (error) {
           res.status(500).json({message:"Something went wrong"})
        }
})

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Hotel" });
    }
  }
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
  
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost *100,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }
    const response = {
      paymentIntent: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };
    res.send(response);
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment Intent Not Found" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res
          .status(400)
          .json({
            message: `payment intent not successded.status:${paymentIntent.status}`,
          });
      }
      
      const newBooking:BookingType={
        ...req.body,
        userId:req.userId
      }

      const hotel=await Hotel.findByIdAndUpdate({_id:req.params.hotelId},{
          $pushL:{ bookings: newBooking}
      });

      if(!hotel){
        return  res.status(400).json({message:"Hotel Not Found"})
      }
      await hotel.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  const constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    const adult = parseInt(queryParams.adultCount);
    if (!isNaN(adult)) {
      constructedQuery.adultCount = { $gte: adult };
    }
  }

  if (queryParams.childCount) {
    const child = parseInt(queryParams.childCount);
    if (!isNaN(child)) {
      constructedQuery.childCount = { $gte: child };
    }
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    let starsArray: number[] = [];

    if (Array.isArray(queryParams.stars)) {
      starsArray = queryParams.stars
        .map((star: string) => parseInt(star))
        .filter((star: number) => !isNaN(star));
    } else {
      const parsed = parseInt(queryParams.stars);
      if (!isNaN(parsed)) {
        starsArray = [parsed];
      }
    }

    if (starsArray.length > 0) {
      constructedQuery.starRating = { $in: starsArray };
    }
  }

  if (queryParams.maxPrice) {
    const maxPrice = parseInt(queryParams.maxPrice);
    if (!isNaN(maxPrice)) {
      constructedQuery.pricePerNight = { $lte: maxPrice };
    }
  }

  return constructedQuery;
};

export default router;
