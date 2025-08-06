
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchContextProvider } from './contexts/SearchContext.tsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY!);

const queryClient=new QueryClient({
    defaultOptions:{
        queries:{
            retry:0,
        },
    },
})

createRoot(document.getElementById('root')!).render(
     <QueryClientProvider client={queryClient}>
        <AppContextProvider>
            <SearchContextProvider>
            <Router>
                 <Elements stripe={stripePromise}>
          <App />
        </Elements>
             
            </Router>

            </SearchContextProvider>
           
           
        </AppContextProvider>
  
     </QueryClientProvider>
    
 
)
