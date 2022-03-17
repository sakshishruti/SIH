import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../App";
import logo from "../../assets/logo.png";
import profile from "../../assets/user.jpg";

const NavbarLink = ({ label, to }) => {
  const location = useLocation();
  const isActive = location.pathname !== to ? "opacity-60" : "";
  return (
    <li>
      <Link to={`${to}`} className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 ${isActive}`} aria-current="page">
        {label.toUpperCase()}
      </Link>
    </li>
  );
};

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function Navbar() {
  const { user, setUser } = useAppContext();
  const ref = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useOnClickOutside(ref, () => setIsDropdownOpen(false));
  const handleLogout = () => {
    setUser((draft) => {
      draft.isAuthenticated = false;
      draft.snackbar.message = "Logged out successfully";
      draft.snackbar.type = "success";
      draft.snackbar.open = true;
      draft.user = {
        username: "",
        password: "",
        name: "",
      };
    });
  };
  return (
    <nav className="border-gray-200 px-2 z-30 sm:px-4 py-2.5 bg-[#295ba5] bg-opacity-90">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} className="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MP Police</span>
        </Link>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-400"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={() => setIsDropdownOpen(true)}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={profile} alt="User" />
          </button>

          <div className={`absolute top-10 right-20 z-50 my-4 text-base list-none rounded divide-y shadow bg-[#295ba5] divide-[#fff] ${!isDropdownOpen && "hidden"}`} ref={ref} id="dropdown">
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">{user.info.name}</span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.info.username}</span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <button className="block w-[100%] py-2 px-4 text-sm text-gray-100 hover:bg-[#22477e] hover:text-white text-left" onClick={handleLogout}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {/* <NavbarLink label="Home" to="/" /> */}
            <NavbarLink label="Track" to="/" />
            <NavbarLink label="Contact" to="/contact" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
