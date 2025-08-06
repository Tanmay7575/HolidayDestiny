// import React from 'react'
// import Header from '../components/Header'

// import Footer from '../components/Footer'
// import SearchBar from '../components/SearchBar';

// interface Props{
//      children:React.ReactNode;
// }

// const Layout = ({children}:Props) => {
//   return (
//     <div className="flex flex-col min-h-screen ">
//         <Header/>
//         <div className="container mx auto px-20 flex justify-center">
//          <SearchBar/>
//         </div>
//         <div className="container mx-auto py-10 flex-1">
          
//           {children}
//         </div>
//         <Footer/>
//     </div>
//   )
// }

// export default Layout

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Responsive Search Bar Container */}
      <div className="container mx-auto px-5 sm:px-10 md:px-16 lg:px-20 py-4">
        <SearchBar />
      </div>

      {/* Main Page Content */}
      <div className="container mx-auto px-5 sm:px-10 md:px-16 lg:px-20 py-10 flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
