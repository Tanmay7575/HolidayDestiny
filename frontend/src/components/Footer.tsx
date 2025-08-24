

const Footer = () => {
 
  return (
    <footer
       className="bg-blue-800 py-6 px-4 md:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xl md:text-2xl text-white font-bold tracking-tight">
          @HolidayDestiny.com
        </span>

        <div className="text-white font-semibold tracking-tight flex flex-col sm:flex-row gap-2 sm:gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Services</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
