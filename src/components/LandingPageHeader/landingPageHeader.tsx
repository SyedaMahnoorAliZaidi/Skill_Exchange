import React, { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "images/dummy images/TaskEase logo.jpg";
import MenuBar from "shared/MenuBar/MenuBar";

// Lucide icons
import { LogIn, UserPlus } from "lucide-react";

interface Header3Props {
  className?: string;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  return (
    <header className={`sticky top-0 z-40 ${className}`}>
      <div className="relative px-4 lg:container h-[88px] flex">
        <div className="flex-1 flex items-center justify-between">
          {/* Logo (lg+) */}
          <div className="relative z-10 hidden md:flex flex-1">
            <img src={Logo} alt="TaskEase logo" className="w-32 h-auto" />
          </div>

          {/* NAV */}
          <div className="hidden md:flex relative z-10 flex-1 items-center justify-end text-neutral-700 dark:text-neutral-100">
            <div className="items-center flex space-x-1">
              {/* Login Button */}
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors mr-2 dark:bg-white dark:text-blue-700 dark:hover:bg-gray-100"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>

              {/* Sign Up Button */}
              <Link
                to="/signup"
                className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors dark:bg-white dark:text-blue-700 dark:hover:bg-gray-100"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </Link>

              <div className="hidden md:block">
                <MenuBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header3;
