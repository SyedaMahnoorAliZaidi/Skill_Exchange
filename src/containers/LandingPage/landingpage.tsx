import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect, useState, useRef } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHero2 from "components/SectionHero2/SectionHero2";

//
import logo1 from "images/logos/nomal/1.png";
import logo1Dark from "images/logos/dark/1.png";
import Header3 from "components/Header/Header3";
//
import logo2 from "images/logos/nomal/2.png";
import logo2Dark from "images/logos/dark/2.png";
//
import logo3 from "images/logos/nomal/3.png";
import logo3Dark from "images/logos/dark/3.png";
//
import logo4 from "images/logos/nomal/4.png";
import logo4Dark from "images/logos/dark/4.png";
//
import logo5 from "images/logos/nomal/5.png";
import logo5Dark from "images/logos/dark/5.png";
//
import HIW1img from "images/HIW2-1.png";
import HIW2img from "images/HIW2-2.png";
import HIW3img from "images/HIW2-3.png";
import HIW1imgDark from "images/HIW2-1-dark.png";
import HIW2imgDark from "images/HIW2-2-dark.png";
import HIW3imgDark from "images/HIW2-3-dark.png";
import rightImgPng from "images/our-features-2.png";

import SectionGridFeatureProperty from "./SectionGridFeatureProperty";
import SectionDowloadApp from "./ExpertsaclickawayUI";
import Heading from "components/Heading/Heading";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import { useNavigate } from "react-router-dom";
import Footer from "shared/Footer/Footer";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/stitching",
    name: "Stitching & Tailoring",
    taxonomy: "category",
    count: 1250,
    thumbnail:
      "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    href: "/plumbing",
    name: "Plumbing Services",
    taxonomy: "category",
    count: 890,
    thumbnail:
      "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    href: "/electrical",
    name: "Electrical Work",
    taxonomy: "category",
    count: 1100,
    thumbnail:
      "https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    href: "/carpentry",
    name: "Carpentry & Woodwork",
    taxonomy: "category",
    count: 750,
    thumbnail:
      "https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    href: "/cleaning",
    name: "Home Cleaning",
    taxonomy: "category",
    count: 2100,
    thumbnail:
      "https://images.pexels.com/photos/4489739/pexels-photo-4489739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "6",
    href: "/gardening",
    name: "Gardening & Landscaping",
    taxonomy: "category",
    count: 680,
    thumbnail:
      "https://images.pexels.com/photos/4489745/pexels-photo-4489745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "7",
    href: "/painting",
    name: "Painting Services",
    taxonomy: "category",
    count: 950,
    thumbnail:
      "https://images.pexels.com/photos/4489741/pexels-photo-4489741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "8",
    href: "/moving",
    name: "Moving & Relocation",
    taxonomy: "category",
    count: 420,
    thumbnail:
      "https://images.pexels.com/photos/4489742/pexels-photo-4489742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "9",
    href: "/repair",
    name: "Repair & Maintenance",
    taxonomy: "category",
    count: 1350,
    thumbnail:
      "https://images.pexels.com/photos/4489743/pexels-photo-4489743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "10",
    href: "/installation",
    name: "Installation Services",
    taxonomy: "category",
    count: 780,
    thumbnail:
      "https://images.pexels.com/photos/4489744/pexels-photo-4489744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

function PageHome2() {
  // CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
    $body.classList.add("theme-cyan-blueGrey");
    return () => {
      $body.classList.remove("theme-cyan-blueGrey");
    };
  }, []);

  // --- SEARCH BAR STATE AND LOGIC ---
  const cities = [
    "Karachi", "Hyderabad", "Sukkur", "Peshawar", "Mardan", "Abbottabad", "Quetta", "Islamabad",
    "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Multan", "Sialkot", "Bahawalpur", "Sargodha",
    "Sheikhupura", "Rahim Yar Khan", "Jhang", "Dera Ghazi Khan", "Gujrat", "Sahiwal", "Wah Cantonment",
    "Okara", "Kasur", "Chiniot", "Mandi Bahauddin", "Kamoke", "Hafizabad", "Khanewal", "Muzaffargarh",
    "Mianwali", "Bhakkar", "Vehari", "Lodhran", "Jhelum", "Toba Tek Singh", "Bahawalnagar", "Narowal",
    "Khushab", "Pakpattan", "Attock", "Chakwal", "Rajana", "Kharian", "Kot Addu", "Kabirwala", "Samundri",
    "Shorkot", "Daska", "Murree"
  ];
  const services = [
    "Stitching", "Plumbing", "Electrical", "Carpentry", "Cleaning", "Gardening", "Painting", "Moving", "Repair", "Installation"
  ];
  const minPrice = 0;
  const maxPrice = 500000;
  const step = 50;

  const [location, setLocation] = useState("");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(500);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setLocationDropdownOpen(false);
      }
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setServiceDropdownOpen(false);
      }
    }
    if (locationDropdownOpen || serviceDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locationDropdownOpen, serviceDropdownOpen]);

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("You must be logged in to search.");
        setSearchLoading(false);
        return;
      }
      const params = new URLSearchParams();
      if (location) params.append("cities", location);
      if (selectedServices.length > 0) params.append("services", selectedServices.join(","));
      if (min) params.append("min_price", min.toString());
      if (max) params.append("max_price", max.toString());
      const response = await fetch(`http://localhost:8000/api/public-search-services/?${params.toString()}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Search failed.");
        setSearchLoading(false);
        setSearchResults([]);
        return;
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError("An error occurred while searching.");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Filtered cities for search
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // --- END SEARCH BAR STATE AND LOGIC ---

  return (
    <>
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero2 className="" />

        {/* SEARCH BAR - below hero, above How We Work */}
        <form
          onSubmit={handleSearch}
          className="w-full relative xl:mt-8 flex flex-col lg:flex-row lg:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-y-0 p-4 gap-4"
        >
          {/* Location Custom Dropdown */}
          <div className="flex-1 relative" ref={locationDropdownRef}>
            <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-200">Location</label>
            <div
              className="w-full rounded-full border border-neutral-300 dark:border-neutral-600 px-4 py-2 bg-white dark:bg-neutral-700 cursor-pointer flex items-center justify-between"
              onClick={() => setLocationDropdownOpen((open) => !open)}
            >
              <span className="truncate overflow-hidden whitespace-nowrap block w-full">
                {location || "Select City"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {locationDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={locationSearch}
                    onChange={e => setLocationSearch(e.target.value)}
                    className="w-full px-3 py-2 mb-2 rounded border border-neutral-300 dark:border-neutral-600 focus:outline-none"
                    onClick={e => e.stopPropagation()}
                  />
                </div>
                {filteredCities.length === 0 && (
                  <div className="px-4 py-2 text-neutral-500">No cities found</div>
                )}
                {filteredCities.map(city => (
                  <div
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    onClick={() => {
                      setLocation(city);
                      setLocationDropdownOpen(false);
                      setLocationSearch("");
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Service Multi-select Dropdown with Tooltip */}
          <div className="flex-1 relative max-w-sm" ref={serviceDropdownRef}>
            <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-200">Service</label>
            <div
              className="w-full rounded-full border border-neutral-300 dark:border-neutral-600 px-4 py-2 bg-white dark:bg-neutral-700 cursor-pointer flex items-center justify-between"
              onClick={() => setServiceDropdownOpen((open) => !open)}
              title={selectedServices.length > 0 ? selectedServices.join(", ") : "Select Service(s)"}
            >
              <span className="truncate overflow-hidden whitespace-nowrap block w-full">
                {selectedServices.length > 0
                  ? selectedServices.join(", ")
                  : "Select Service(s)"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${serviceDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {serviceDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="form-checkbox mr-2"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1">
              <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-200">Min Price (₨)</label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                step={step}
                value={min}
                onChange={e => setMin(Number(e.target.value))}
                className="w-full rounded-full border border-neutral-300 dark:border-neutral-600 px-4 py-2 focus:outline-none"
                required
              />
            </div>
            <span className="mx-2 text-neutral-500">-</span>
            <div className="flex-1">
              <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-200">Max Price (₨)</label>
              <input
                type="number"
                min={500}
                max={maxPrice}
                step={step}
                value={max}
                onChange={e => setMax(Number(e.target.value))}
                className="w-full rounded-full border border-neutral-300 dark:border-neutral-600 px-4 py-2 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="ml-0 lg:ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            aria-label="Search"
            disabled={searchLoading}
          >
            {/* Magnifying glass icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        {/* SEARCH RESULTS SECTION - render above How We Work */}
        {searchResults !== null && (
          <div className="container">
            <div className="nc-SectionGridFeatureProperty relative rounded-2xl py-16 px-6 bg-blue-50 dark:bg-neutral-800">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Search Results
                </h2>
                <span className="block mt-2 text-xl text-gray-500 dark:text-gray-400">
                  Services matching your search
                </span>
              </div>
              {searchLoading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-6000"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 dark:text-red-400 py-10">{error}</div>
              ) : searchResults.length === 0 ? (
                <div className="flex justify-center items-center py-16">
                  <span className="text-gray-500 dark:text-gray-400 text-lg">No services found.</span>
                </div>
              ) : (
                <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
                  {searchResults.map((service: any, idx: number) => (
                    <PropertyCardH
                      key={service.id || idx}
                      expertName={service.title || service.selected_service}
                      yearsExperience={service.years_of_experience || 0}
                      price={service.price}
                      image={
                        service.cover_image ||
                        (service.work_images && service.work_images.length > 0 ? service.work_images[0] : undefined)
                      }
                      onClick={() => navigate("/customer-service-detail", { state: { service } })}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION */}
        <SectionHowItWork
          data={[
            {
              id: 1,
              img: HIW1img,
              imgDark: HIW1imgDark,
              title: "Smart search",
              desc: "Select the service you are looking for in the search bar. Our app will find you the perfect match.",
            },
            {
              id: 2,
              img: HIW2img,
              imgDark: HIW2imgDark,
              title: "Choose service",
              desc: "From the number of options our app will provide, you can select any service that you would like to explore.",
            },
            {
              id: 3,
              img: HIW3img,
              imgDark: HIW3imgDark,
              title: "Book an appointment",
              desc: "Select your service , add your address , any additional notes and proceed for booking.",
            },
          ]}
        />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeatureProperty />
        </div>

        {/* SECTION2 */}
        <SectionOurFeatures type="type2" rightImg={rightImgPng} />

        {/* SECTION */}
        <SectionDowloadApp />

        {/* SECTION 1 */}
        <div className="nc-SectionSliderNewCategories">
          <div className="flow-root">
            <Heading
              desc="popular services to try"
              hasNextPrev={false}
              isCenter={true}
            >
              Services at your footstep
            </Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
              {DEMO_CATS_2.map((item, index) => (
                <CardCategory4 key={index} taxonomy={item} />
              ))}
            </div>
          </div>
        </div>

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection className="bg-neutral-100 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox boxCard="box2" />
        </div>

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          heading="Explore by types of services"
          subHeading="Explore the best services in town "
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome2_s2"
        />

        {/* SECTION */}
        <SectionSubscribe2 />
        <Footer/>
      </div>
    </div>
    </>
  );
}


export default PageHome2;
