import React, { FC, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import AdminHeader from "components/Header/AdminHeader";
import Footer from "shared/Footer/Footer";
import SectionHero from "components/SectionHero/SectionHero";
import SectionGridFeatureProperty from "containers/LandingPage/SectionGridFeatureProperty";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { TaxonomyType } from "data/types";
import SectionHero2 from "components/SectionHero2/SectionHero2";
import { FeatureServiceCard } from "containers/LandingPage/SectionGridFeatureProperty";
import { useNavigate } from "react-router-dom";
import { getMLRecommendedServices } from "../../api/booking";

import imagePng from "images/dummy images/professionals (2).jpg";
import HeroRealEstateSearchForm from "components/HeroSearchForm/(real-estate-search-form)/HeroRealEstateSearchForm";
import { ClassOfProperties } from "components/HeroSearchForm/type";


import HIW1img from "images/HIW2-1.png";
import HIW2img from "images/HIW2-2.png";
import HIW3img from "images/HIW2-3.png";
import HIW1imgDark from "images/HIW2-1-dark.png";
import HIW2imgDark from "images/HIW2-2-dark.png";
import HIW3imgDark from "images/HIW2-3-dark.png";
import rightImgPng from "images/our-features-2.png";

import SectionDowloadApp from "containers/LandingPage/ExpertsaclickawayUI";
import Heading from "components/Heading/Heading";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import Header3 from "components/Header/Header3";

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

export interface CustomerHomePageProps {
  className?: string;
}

const CustomerHomePage: FC<CustomerHomePageProps> = ({ className = "" }) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false); // main page loading
  const [error, setError] = useState<string | null>(null);
  const [mlRecommendations, setMlRecommendations] = useState<any[]>([]);
  const [mlLoading, setMlLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // search form loading
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    const accessToken = localStorage.getItem("accessToken");
    
    console.log("🔍 useEffect triggered - storedUserInfo:", !!storedUserInfo, "accessToken:", !!accessToken);
    
    if (storedUserInfo && accessToken) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      setShowWelcome(true);
      
      // Hide welcome message after 5 seconds
      setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      
      // Fetch ML recommendations only if user is a customer
      if (parsedUserInfo.role === 'Customer') {
        console.log("🚀 Calling fetchMLRecommendations...");
        fetchMLRecommendations();
      } else {
        console.log("⚠️ User is not a customer, skipping ML recommendations");
      }
    } else {
      console.log("❌ No user info or access token found");
      // Try to fetch ML recommendations anyway if we have a token
      if (accessToken) {
        console.log("🚀 Trying ML recommendations with token only...");
        fetchMLRecommendations();
      }
    }
  }, []);

  const fetchMLRecommendations = async () => {
    try {
      setMlLoading(true);
      console.log("🔍 Fetching ML recommendations...");
      const data = await getMLRecommendedServices();
      console.log("✅ ML Recommendations:", data);
      setMlRecommendations(data || []);
    } catch (error) {
      console.error("❌ Error fetching ML recommendations:", error);
      setMlRecommendations([]);
    } finally {
      setMlLoading(false);
    }
  };

  // CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
    $body.classList.add("theme-cyan-blueGrey");
    return () => {
      $body.classList.remove("theme-cyan-blueGrey");
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };


  //search



  const cities = [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Peshawar",
    "Mardan",
    "Abbottabad",
    "Quetta",
    "Islamabad",
  
    // All major cities & district HQs of Punjab
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Rahim Yar Khan",
    "Jhang",
    "Dera Ghazi Khan",
    "Gujrat",
    "Sahiwal",
    "Wah Cantonment",
    "Okara",
    "Kasur",
    "Chiniot",
    "Mandi Bahauddin",
    "Kamoke",
    "Hafizabad",
    "Khanewal",
    "Muzaffargarh",
    "Mianwali",
    "Bhakkar",
    "Vehari",
    "Lodhran",
    "Jhelum",
    "Toba Tek Singh",
    "Bahawalnagar",
    "Narowal",
    "Khushab",
    "Pakpattan",
    "Attock",
    "Chakwal",
    "Rajana",
    "Kharian",
    "Kot Addu",
    "Kabirwala",
    "Samundri",
    "Shorkot",
    "Daska",
    "Murree",
  ];
  
  const services = [
    "Stitching",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Cleaning",
    "Gardening",
    "Painting",
    "Moving",
    "Repair",
    "Installation",
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
  
    // Close dropdowns if clicked outside
    React.useEffect(() => {
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
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("You must be logged in to search.");
          setSearchLoading(false);
          return;
        }
        const params = new URLSearchParams();
        if (location) params.append("cities", location);
        if (selectedServices.length > 0) params.append("services", selectedServices.join(","));
        if (min) params.append("min_price", min.toString());
        if (max) params.append("max_price", max.toString());
        const response = await fetch(`http://localhost:8000/api/search-services/?${params.toString()}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error || "Search failed.");
          setSearchLoading(false);
          return;
        }
        const data = await response.json();
        console.log('API search results:', data);
        setSearchResults(data);
        // alert(`Found ${data.length} services.`);
      } catch (err) {
        alert("An error occurred while searching.");
      } finally {
        setSearchLoading(false);
      }
    };
  
    // Filtered cities for search
    const filteredCities = cities.filter(city =>
      city.toLowerCase().includes(locationSearch.toLowerCase())
    );




    
  return (
    <div className={`nc-CustomerHomePage ${className}`} data-nc-id="CustomerHomePage">
      <Helmet>
        <title>Welcome to TaskEase | Your Home for Professional Services</title>
      </Helmet>

      

      <Header3 />


      <div className="nc-PageHome2 relative overflow-hidden">
        <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
          {/* Always show greeting at the top, before the search bar */}
          


          {/* search */}
          

          <div
      className={`nc-SectionHero2 relative ${className} `}
      data-nc-id="SectionHero2"
    >
      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow mt-0">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={imagePng}
          alt="hero"
        />
      </div>
      <div className="relative py-4 lg:py-6">
        <div className="relative inline-flex">
          <div className="w-screen right-20 md:right-52 inset-y-0 absolute bg-primary-500"></div>
          <div className="relative max-w-3xl inline-flex flex-shrink-0 flex-col items-start py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 text-white">
            { (
              <h2 className="font-semibold text-4xl md:text-5xl xl:text-7xl !leading-[110%]">
                Your Experts Now<br /> A Click Away
              </h2>
            )}
          </div>
        </div>
        <div className="hidden lg:block lg:mt-20 w-full">

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


          
        </div>
      </div>
    </div>
        


          {/* SEARCH RESULTS SECTION - render above How We Work */}
          {searchResults !== null && (
            <div className="container">
              <div className="nc-SectionGridFeatureProperty relative bg-blue-50 rounded-2xl py-16 px-6">
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
                  <div className="text-center text-red-500 py-10">{error}</div>
                ) : searchResults.length === 0 ? (
                  <div className="flex justify-center items-center py-16">
                    <span className="text-gray-500 text-lg">No services found.</span>
                  </div>
                ) : (
                  <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
                    {searchResults.map((service, idx) => (
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
          {/* <div className="relative py-16">
            <BackgroundSection />
            {searchResults !== null ? (
              searchLoading ? (
                <div className="text-center py-10">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-10">No services found.</div>
              ) : (
                <div className="container">
                  <div className="nc-SectionGridFeatureProperty relative bg-blue-50 rounded-2xl py-16 px-6">
                    <div className="mb-12">
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Search Results
                      </h2>
                      <span className="block mt-2 text-xl text-gray-500 dark:text-gray-400">
                        Services matching your search
                      </span>
                    </div>
                    <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
                      {searchResults.map((service, idx) => (
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
                  </div>
                </div>
              )
            ) : (
              <SectionGridFeatureProperty navigationRoute="/customer-service-detail" />
            )}
          </div> */}
          {/* ML RECOMMENDATIONS SECTION */}
          <div className="relative py-16">
            <div className="container">
              <div className="nc-SectionGridFeatureProperty relative bg-blue-50 rounded-2xl py-16 px-6">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Recommended for you
                  </h2>
                  <span className="block mt-2 text-xl text-gray-500 dark:text-gray-400">
                    Popular services personalized to your preferences
                  </span>
                </div>
                {mlLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-6000"></div>
                  </div>
                ) : mlRecommendations.length > 0 ? (
                  <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
                    {mlRecommendations.slice(0, 4).map((service, idx) => {
                      console.log('ML Card Data:', service);
                      return (
                        <PropertyCardH
                          key={service.id || idx}
                          expertName={service.title || service.selected_service}
                          yearsExperience={service.years_of_experience || 0}
                          price={Number(service.price) || 0}
                          image={
                            service.cover_image ||
                            (service.work_images && service.work_images.length > 0 ? service.work_images[0] : undefined)
                          }
                          onClick={() => navigate("/customer-service-detail", { state: { service } })}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-16">
                    <span className="text-gray-500 text-lg">No personalized recommendations yet.</span>
                  </div>
                )}
              </div>
            </div>
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
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CustomerHomePage; 