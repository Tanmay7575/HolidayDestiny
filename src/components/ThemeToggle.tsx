import { MoonStar } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { SunIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();


  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
    >
      <span
        className={`absolute left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          theme === "light" ? "translate-x-0" : "translate-x-6"
        }`}
      />
      {theme === "dark" ? (
        <MoonStar className="w-5 h-5 text-yellow-500 ml-auto mr-1" />
      ) : (
        <SunIcon className="w-5 h-5 text-blue-300 ml-1" />
      )}
    </button>
  );
};

export default ThemeToggle;
