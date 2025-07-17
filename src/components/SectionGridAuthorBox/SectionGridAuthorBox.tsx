import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link } from "react-router-dom";

export interface ServiceType {
  id: string;
  name: string;
  href: string;
  image: string;
  priceRange: string;
  category: string;
}

export interface SectionGridAuthorBoxProps {
  className?: string;
  services?: ServiceType[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
}

const TOP_SERVICES: ServiceType[] = [
  {
    id: "1",
    name: "Professional Home Cleaning",
    href: "/cleaning",
    image: "https://images.pexels.com/photos/4489739/pexels-photo-4489739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    priceRange: "PKR 500 - 1,500",
    category: "Cleaning"
  },
  {
    id: "2",
    name: "Expert Electrical Services",
    href: "/electrical",
    image: "https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    priceRange: "PKR 800 - 2,000",
    category: "Electrical"
  },
  {
    id: "3",
    name: "Premium Plumbing Solutions",
    href: "/plumbing",
    image: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    priceRange: "PKR 600 - 1,800",
    category: "Plumbing"
  },
  {
    id: "4",
    name: "Quality Carpentry Work",
    href: "/carpentry",
    image: "https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    priceRange: "PKR 1,000 - 3,000",
    category: "Carpentry"
  },
  {
    id: "5",
    name: "Garden & Landscape Design",
    href: "/gardening",
    image: "https://images.pexels.com/photos/4489745/pexels-photo-4489745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    priceRange: "PKR 700 - 2,500",
    category: "Gardening"
  }
];

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  services = TOP_SERVICES,
  boxCard = "box1",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading  isCenter>
        Top 5 Services of the Month
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {services.map((service, index) => (
          <Link key={service.id} to={service.href} className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white dark:bg-neutral-700 rounded-full px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {service.category}
                </div>
              </div>
              
              {/* Service Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                
                {/* Price Range */}
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {service.priceRange}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
     
    </div>
  );
};

export default SectionGridAuthorBox;
