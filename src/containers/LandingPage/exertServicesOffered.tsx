import React, { FC, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";

// API call for expert services
const getExpertServices = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get("http://127.0.0.1:8000/api/my-services/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const ExertServicesOffered: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getExpertServices()
      .then((data) => setServices(data))
      .catch((err) => {
        setServices([]);
        // Optionally handle error
      });
  }, []);

  // Map API data to PropertyCardH expected props
  const renderCard = (service: any, index: number) => {
    return (
      <PropertyCardH
        key={index}
        className="h-full"
        expertName={service.expert_name || service.name || "Expert"}
        yearsExperience={service.years_experience || service.yearsExperience || 0}
        price={service.price || 0}
      />
    );
  };

  const subHeading = "Popular services you offer ";
  const heading = "Your Expert Services Offered";
  const gridClass = "";

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter
        subHeading={subHeading}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
      >
        {services.map(renderCard)}
      </div>
      <div className="flex mt-16 justify-center items-center space-x-6">
        <ButtonPrimary onClick={() => (window.location.href = "/add-listing-1")}>Add Service</ButtonPrimary>
        <ButtonPrimary onClick={() => (window.location.href = "/delete-service")}>Delete Service</ButtonPrimary>
      </div>
    </div>
  );
};

export default ExertServicesOffered;