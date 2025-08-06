import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 px-4 sm:px-6 md:px-10 py-15">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">HolidayDestiny.com</Link>
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                className="text-white px-4 py-1 font-bold bg-blue-600 rounded hover:bg-green-500"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-white px-4 py-1 font-bold bg-blue-500 rounded hover:bg-green-500"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/Sign-In"
              className="text-white px-4 py-1 font-bold bg-blue-600 rounded "
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        {isLoggedIn && (
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="md:hidden">
            <Link
              to="/Sign-In"
              className="text-white px-4 py-1 font-bold bg-blue-600 rounded"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && isLoggedIn && (
        <div className="md:hidden mt-2 px-4 flex flex-col gap-2">
          <Link
            to="/my-bookings"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setMenuOpen(false)}
          >
            My Bookings
          </Link>
          <Link
            to="/my-hotels"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setMenuOpen(false)}
          >
            My Hotels
          </Link>
          <SignOutButton />
        </div>
      )}
    </header>
  );
};

export default Header;



