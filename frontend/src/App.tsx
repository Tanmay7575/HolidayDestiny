
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';


const App = () => {
  const {isLoggedIn}=useAppContext();
  return (
  <>
   <ToastContainer position="top-right" autoClose={3000} />
     
      <Routes>
      <Route path="/" element={<Layout>
        <p>Home Page</p>
      </Layout>}/>
      <Route path="/register" element={<Layout>
        <Register/>
        </Layout>}/>
        <Route path="/Sign-In" element={<Layout>
          <SignIn/>
        </Layout>}/>
         {isLoggedIn && <>
          <Route path="/add-hotel" element={
            <Layout>
              <AddHotel/>
            </Layout>
          }/>
          </>
          }

      </Routes>
 
    </>
  )
}

export default App