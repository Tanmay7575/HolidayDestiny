
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotel from './pages/MyHotel';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import Home from './pages/Home';
import MyBookings from './pages/MyBooking';


const App = () => {
  const {isLoggedIn}=useAppContext();
  return (
  <div className=" overflow-x-hidden">
   <ToastContainer position="top-right" autoClose={3000} />
     
      <Routes>
      <Route path="/" element={<Layout>
        <Home/>
      </Layout>}/>
      <Route path="/register" element={<Layout>
        <Register/>
        </Layout>}/>
        <Route path="/Sign-In" element={<Layout>
          <SignIn/>
        </Layout>}/>
          <Route path="/search" element={<Layout>
            <Search/>
               </Layout>}/>
             <Route path="/detail/:hotelId" element={<Layout>
            <Detail/>
               </Layout>}/>  

         {isLoggedIn && <>
             <Route path="/my-Bookings" element={
            <Layout>
          <MyBookings/>
            </Layout>
          }/>
               <Route path="/hotels/:hotelId/Bookings" element={
            <Layout>
            <Booking/>
            </Layout>
          }/>

          <Route path="/add-hotel" element={
            <Layout>
              <AddHotel/>
            </Layout>
          }/>
          <Route path="/edit-hotel/:hotelId" element={
            <Layout>
              <EditHotel/>
            </Layout>
          }/>
           <Route path="/my-hotels" element={
            <Layout>
              <MyHotel/>
            </Layout>
          }/>
          </>
          }

      </Routes>
 
    </div>
  )
}

export default App