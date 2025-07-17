import React, { useState, useRef } from "react";

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

const minPrice = 1000;
const maxPrice = 500000;
const step = 500;

const RealEstateSearchForm = () => {
  const [location, setLocation] = useState("");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("You must be logged in to search.");
        setLoading(false);
        return;
      }
      const params = new URLSearchParams();
      if (location) params.append("cities", location);
      if (selectedServices.length > 0) params.append("services", selectedServices.join(","));
      if (min) params.append("min_price", min.toString());
      if (max) params.append("max_price", max.toString());
      const response = await await fetch(`http://localhost:8000/api/search-services/?${params.toString()}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Search failed.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      alert(`Found ${data.length} services.`);
      // TODO: handle/display results in the UI
    } catch (err) {
      alert("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered cities for search
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
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
            min={minPrice}
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
        disabled={loading}
      >
        {/* Magnifying glass icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
};

export default RealEstateSearchForm;
