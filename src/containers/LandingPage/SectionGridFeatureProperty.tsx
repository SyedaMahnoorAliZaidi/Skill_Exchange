import React, { FC, ReactNode, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";
export interface SectionGridFeaturePropertyProps {
  services?: any[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  navigationRoute?: string;
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  services = [],
  gridClass = "",
  heading = "Popular Services",
  subHeading = "Services in demand",
  headingIsCenter,
  tabs = ["electrician", "plumber", "AC technician", "house help"],
  navigationRoute = "/service-detail",
}) => {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [displayedServices, setDisplayedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Handle card click to navigate to service detail
  const handleCardClick = (service: any) => {
    navigate(navigationRoute, { state: { service } });
  };

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}/random-unique-services/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const fetchedServices = response.data;
      setAllServices(fetchedServices);
      setDisplayedServices(fetchedServices.slice(0, 10));
      setHasMore(fetchedServices.length > 10);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load more services
  const loadMoreServices = () => {
    if (currentIndex >= allServices.length) {
      setHasMore(false);
      return;
    }

    setLoadingMore(true);
    const nextIndex = Math.min(currentIndex + 4, allServices.length);
    const newServices = allServices.slice(currentIndex, nextIndex);
    
    setDisplayedServices(prev => [...prev, ...newServices]);
    setCurrentIndex(nextIndex);
    setHasMore(nextIndex < allServices.length);
    setLoadingMore(false);
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const getImageUrl = (path?: string) =>
    path?.startsWith("/service-detail") ? `http://localhost:8000${path}` : path;

  const renderCard = (service: any, index: number) => {
    const price =
      service.hourly_rate && parseFloat(service.hourly_rate) !== 0
        ? parseFloat(service.hourly_rate)
        : service.price && parseFloat(service.price) !== 0
          ? parseFloat(service.price)
          : 0;

    console.log("service.id:", service.id, "hourly_rate:", service.hourly_rate, "price:", service.price);
    console.log("DEBUG price for", service.selected_service, ":", price, "hourly_rate:", service.hourly_rate, "price:", service.price);

    return (
      <PropertyCardH
        key={service.id || index}
        expertName={service.selected_service}
        yearsExperience={service.years_of_experience || 0}
        price={price}
        image={
          getImageUrl(service.cover_image) ||
          getImageUrl(service.work_images?.[0]?.image)
        }
        className="h-full"
        onClick={() => handleCardClick(service)}
      />
    );
  };

  console.log("All services data:", displayedServices);

  if (loading) {
    return (
      <div className="nc-SectionGridFeatureProperty relative">
        <HeaderFilter subHeading={subHeading} heading={heading} onClickTab={() => {}} />
        <div className="flex justify-center items-center py-16">
          <div className="text-lg text-gray-600">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter subHeading={subHeading} heading={heading} onClickTab={() => {}} />
      <div className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}>
        {displayedServices.map(renderCard)}
      </div>
      {hasMore && (
        <div className="flex mt-16 justify-center items-center">
          <ButtonPrimary 
            onClick={loadMoreServices}
            loading={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More Services"}
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default SectionGridFeatureProperty;

export const FeatureServiceCard = ({ service, onClick }: { service: any; onClick?: () => void }) => {
  const getImageUrl = (path?: string) =>
    path?.startsWith("/service-detail") ? `http://localhost:8000${path}` : path;
  const price =
    service.hourly_rate && parseFloat(service.hourly_rate) !== 0
      ? parseFloat(service.hourly_rate)
      : service.price && parseFloat(service.price) !== 0
        ? parseFloat(service.price)
        : 0;
  return (
    <PropertyCardH
      key={service.id}
      expertName={service.selected_service}
      yearsExperience={service.years_of_experience || 0}
      price={price}
      image={
        getImageUrl(service.cover_image) ||
        getImageUrl(service.work_images?.[0]?.image)
      }
      className="h-full"
      onClick={onClick}
    />
  );
};
