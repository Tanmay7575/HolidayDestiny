
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/SignIn';


const App = () => {
  return (<>
   <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
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

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App