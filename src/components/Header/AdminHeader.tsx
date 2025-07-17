import React, { FC, useEffect, useRef, useState } from "react";
import LogoLight from "images/dummy images/light.png";
import LogoDark from "images/dummy images/dark.png";
import AdminHeaderMenue from "components/Header/AdminHeaderMenue"

import { Link, useLocation } from "react-router-dom";

import AvatarDropdown from "./AdminAvatarDdropDown";
import MenuBar from "shared/MenuBar/MenuBar";

interface Header3Props {
  className?: string;
  // userType?: 'expert' | 'customer'; // Removed userType prop
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  // Detect dark mode using the 'dark' class on body or html
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark") || document.body.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 ${className}`}
        style={{ backgroundColor: isDark ? "transparent" : "#e6f2ff" }}
      >
        <div className="relative px-4 lg:container h-[88px] flex" style={{ backgroundColor: isDark ? "transparent" : "#e6f2ff" }}>
          <div className="flex-1 flex items-center justify-between">
            {/* Logo (lg+) */}
            <div className="relative z-10 hidden md:flex flex-1">
              <Link to="/adminHomepage">
                <img
                  src={isDark ? LogoDark : LogoLight}
                  alt="TaskEase logo"
                  className="w-32 h-auto cursor-pointer"
                />
              </Link>
            </div>
            {/* NAV */}
            <div className="hidden md:flex relative z-10 flex-1 items-center justify-end text-neutral-700 dark:text-neutral-100">
              <div className="items-center flex space-x-1">
                <div></div>
                <AvatarDropdown />
                <div className="hidden md:block">
                  <AdminHeaderMenue/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
