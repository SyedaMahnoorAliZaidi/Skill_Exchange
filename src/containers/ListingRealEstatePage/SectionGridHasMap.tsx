import { FC, useState, useEffect } from "react";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import MapContainer from "containers/MapContainer";
import axios from "axios";

const SectionGridHasMap: FC<{}> = () => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Fetch real backend data
    const fetchServices = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/my-services/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      } catch (err) {
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          <Heading2
            heading="Experiences in Your Area"
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                {services.length} services
              </span>
            }
          />
          <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {services.map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                onMouseLeave={() => setCurrentHoverID((_) => -1)}
              >
                <PropertyCardH
                  expertName={item.selected_service || item.title}
                  yearsExperience={item.years_of_experience || 0}
                  price={parseFloat(item.price) || 0}
                  image={
                    item.cover_image ||
                    (item.work_images && item.work_images.length > 0
                      ? item.work_images[0].image
                      : "")
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div>
        </div>

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {/* You can keep or remove the map logic as needed */}
          {showFullMapFixed && (
            <button
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            >
              Close
            </button>
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <MapContainer
              currentHoverID={currentHoverID}
              DEMO_DATA={services}
              listingType="experiences"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
