
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom';

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
            <Router>
                 <App />
            </Router>
           
        </AppContextProvider>
  
     </QueryClientProvider>
    
 
)
