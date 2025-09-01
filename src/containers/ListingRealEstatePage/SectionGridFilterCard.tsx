import React, { FC, useEffect, useState } from "react";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import axios from "axios";

export interface SectionGridFilterCardProps {
  className?: string;
  data: any[];
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data,
}) => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      console.log("📌 useEffect is running");
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/my-services/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ SERVICES FROM API:", res.data);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  const getImageUrl = (path?: string) =>
    path?.startsWith("/") ? `http://localhost:8000${path}` : path;

  const renderCard = (service: any, index: number) => {
    const imageUrl =
      getImageUrl(service.cover_image) || getImageUrl(service.work_images?.[0]?.image);

    const cardProps = {
      expertName: service.selected_service,
      yearsExperience: service.years_of_experience,
      price: parseFloat(service.price),
      image: imageUrl,
    };

    console.log("➡️ Card Props for rendering:", cardProps);

    return (
      <PropertyCardH
        key={service.id || index}
        {...cardProps}
        className="h-full"
      />
    );
  };

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Experts in Lahore"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            233 Property<span className="mx-2">·</span>Aug 12 - 18
          </span>
        }
      />
      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {services.map(renderCard)}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
