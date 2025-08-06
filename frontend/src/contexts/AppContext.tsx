import React, { useContext, useState } from "react";
import { Toast } from "../components/toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from '../api-client'
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY=import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage={
    message:string;
    type:"SUCCESS" | "ERROR";
}


export type AppContext={
       showToast:(toastMessage:ToastMessage)=> void
       isLoggedIn:boolean;
       refetchToken: () => void;
       stripePromise:Promise<Stripe | null>
}



const AppContext=React.createContext<AppContext | undefined>(undefined);

const stripePromise=loadStripe(STRIPE_PUB_KEY);



export const AppContextProvider=({children}:{children:React.ReactNode})=>{
    const [toast,setToast]=useState<ToastMessage | undefined>(undefined);
    const { isError,refetch } = useQuery({
  queryKey: ["validateToken"],
  queryFn: apiClient.validateToken,
  retry: false,
});


          return(
           <AppContext.Provider value={{
            showToast:(toastMessage)=>{
                setToast(toastMessage)
            },
            isLoggedIn:!isError,
             refetchToken: refetch,
             stripePromise
           }}>

             {toast && (
                <Toast
                 message={toast.message} 
                 type={toast.type}
                 onClose={()=>setToast(undefined)}/>)}
            {children}
           </AppContext.Provider>
          )
};

export const useAppContext=()=>{
    const context=useContext(AppContext);
    return context as AppContext;
};
