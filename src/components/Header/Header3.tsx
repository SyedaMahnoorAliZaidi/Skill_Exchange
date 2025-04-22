import React, { FC, useEffect, useRef, useState } from "react";
import Logo from "images/dummy images/TaskEase logo.jpg";

import { Link, useLocation } from "react-router-dom";

import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "shared/MenuBar/MenuBar";


interface Header3Props {
  className?: string;
}



const Header3: FC<Header3Props> = ({ className = "" }) => {
 

  return (
    <>
      
      
      <header  className={`sticky top-0 z-40 ${className}`}>
        
        <div className="relative px-4 lg:container h-[88px] flex ">
          <div className="flex-1 flex items-center justify-between">
            {/* Logo (lg+) */}
            <div className="relative z-10 hidden md:flex flex-1">
            <img src={Logo} alt="TaskEase logo" className="w-32 h-auto" />

            </div>

          

            {/* NAV */}
            <div className="hidden md:flex relative z-10 flex-1 items-center justify-end text-neutral-700 dark:text-neutral-100">
              <div className="items-center flex space-x-1">
                

                <div></div>
                
               
                <AvatarDropdown />
                <div className="hidden md:block">
                  <MenuBar />
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
