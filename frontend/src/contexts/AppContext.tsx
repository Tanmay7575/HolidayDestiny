import React, { useContext, useState } from "react";
import { Toast } from "../components/toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from '../api-client'

type ToastMessage={
    message:string;
    type:"SUCCESS" | "ERROR";
}


export type AppContext={
       showToast:(toastMessage:ToastMessage)=> void
       isLoggedIn:boolean;
       refetchToken: () => void;
}



const AppContext=React.createContext<AppContext | undefined>(undefined);

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
             refetchToken: refetch
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
