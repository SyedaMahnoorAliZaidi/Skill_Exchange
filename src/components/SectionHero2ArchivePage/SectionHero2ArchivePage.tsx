import React, { FC } from "react";
import imagePng from "images/dummy images/professionals (2).jpg";
import HeroRealEstateSearchForm from "components/HeroSearchForm/(real-estate-search-form)/HeroRealEstateSearchForm";

export interface SectionHero2ArchivePageProps {
  className?: string;
  children?: React.ReactNode;
}

const SectionHero2ArchivePage: FC<SectionHero2ArchivePageProps> = ({
  className = "",
  children,
}) => {
  return (
    <div
      className={`nc-SectionHero2ArchivePage relative ${className}`}
      data-nc-id="SectionHero2ArchivePage"
    >
      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={imagePng}
          alt="hero"
        />
      </div>
      <div className="relative py-14 ">
      <div className="relative inline-flex">
          <div className="w-screen right-0 md:right-42 inset-y-0 absolute bg-primary-500"></div>
          <div className="relative max-w-4xl inline-flex flex-shrink-0 flex-col items-start py-20 sm:py-20 space-y-8 sm:space-y-10 text-white">
            <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl ">
            Your Tasks,Simplified  
            </h2>
            <div className="flex items-center text-base md:text-lg ">
              <i className="text-2xl las la-map-marked"></i>
              <span className="ml-2.5">Lahore </span>
              <span className="mx-5"></span>
              <i className="text-2xl las la-work"></i>
              <span className="ml-2.5">112 Experts</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:block mt-10 w-full">
        //  <HeroRealEstateSearchForm />
        </div>
      </div>
    </div>
  );
};

export default SectionHero2ArchivePage;
