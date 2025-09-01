import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "components/Header/AdminHeader";
import Footer from "shared/Footer/Footer";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import HeaderFilter from "../LandingPage/HeaderFilter";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import dowloadAppBGPng from "images/dowloadAppBG.png";
import appRightImg from "images/appRightImg.png";
import appRightImgTree from "images/appRightImgTree.png";
import appSvg1 from "images/appSvg1.svg";
import appSvg2 from "images/appSvg2.svg";
import Header3 from "components/Header/Header3";

interface RepairService {
  id: string;
  selected_service: string;
  specific_services: string[];
  city: string;
  expertise_level: string;
  years_of_experience: number;
  description: string;
  currency: string;
  hourly_rate: number;
  weekend_rate: number;
  bulk_discount: number;
  cover_image?: string;
  work_images?: Array<{ image: string }>;
  user: { id: string; username: string; email: string; };
  created_at: string;
  updated_at: string;
}

const Repair: React.FC = () => {
  const [services, setServices] = useState<RepairService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchRepairServices(); }, []);

  const fetchRepairServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");
      if (!token) { setError("Please login to view services"); setLoading(false); return; }

      const response = await axios.get("http://localhost:8000/api/services-by-category/", {
        headers: { Authorization: `Bearer ${token}` },
        params: { category: "Repair" }
      });
      setServices(response.data);
    } catch (err: any) {
      console.error("Error fetching repair services:", err);
      setError(err.response?.data?.message || "Failed to fetch repair services");
    } finally { setLoading(false); }
  };

  const getImageUrl = (path?: string) => {
    if (!path) return undefined;
    if (path.startsWith('data:image/')) { console.warn('Skipping base64 image'); return undefined; }
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return path.startsWith("/") ? `http://localhost:8000${path}` : path;
  };

  const handleCardClick = (service: RepairService) => {
    navigate("/customer-service-detail", { state: { service } });
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.selected_service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || service.city.toLowerCase().includes(selectedCity.toLowerCase());
    return matchesSearch && matchesCity;
  });

  const uniqueCities = Array.from(new Set(services.map(service => service.city)));

  return (
    <div className="nc-RepairPage">
     <Header3/>
      <br/>
      <br/>
      <br/>
      <div className="relative pb-0 pt-24 lg:py-32 xl:py-40 2xl:py-48">
      <BackgroundSection className="bg-neutral-100 bg-opacity-80 dark:bg-opacity-100 ">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-3xl object-right"
          src={dowloadAppBGPng}
          alt="dowloadAppPng"
        />

        <div className="hidden lg:block absolute right-0 bottom-0 max-w-xl xl:max-w-2xl rounded-3xl overflow-hidden">
          <img src={appRightImg} alt="" />
        </div>
        <div className="absolute right-0 top-0 max-w-2xl">
          <img src={appRightImgTree} alt="" />
        </div>
        <div className="absolute left-0 bottom-10 max-w-2xl">
          <img src={appSvg1} alt="" />
        </div>
      </BackgroundSection>

      <div className="relative inline-block ">
        

        <img
          className="hidden lg:block absolute lg:left-full lg:top-0 xl:top-1/2 z-10  lg:max-w-sm 2xl:max-w-none"
          src={appSvg2}
          alt=""
        />

        <div className="block lg:hidden mt-10 max-w-2xl rounded-3xl overflow-hidden">
          <img src={appRightImg} alt="" />
        </div>
      </div>
    </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Repair Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find expert repair professionals in your area. From electronics to appliances, get reliable repair solutions with our skilled technicians.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Services</label>
              <input type="text" placeholder="Search by service, description, or city..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by City</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Cities</option>
                {uniqueCities.map(city => (<option key={city} value={city}>{city}</option>))}
              </select>
            </div>
            <div className="flex items-end">
              <ButtonPrimary onClick={fetchRepairServices} className="w-full">Refresh Services</ButtonPrimary>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <HeaderFilter heading={`${filteredServices.length} Repair Services Available`}
            subHeading="Professional repair experts ready to serve you" onClickTab={() => {}} />
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading repair services...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
                <ButtonPrimary onClick={fetchRepairServices} className="mt-4">Try Again</ButtonPrimary>
              </div>
            </div>
          )}
          {!loading && !error && filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Repair Services Found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCity ? "Try adjusting your search criteria or filters." : "No repair services are currently available in your area."}
                </p>
                {(searchTerm || selectedCity) && (
                  <ButtonPrimary onClick={() => { setSearchTerm(""); setSelectedCity(""); }}>Clear Filters</ButtonPrimary>
                )}
              </div>
            </div>
          )}
          {!loading && !error && filteredServices.length > 0 && (
            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service, index) => {
                const imageUrl = getImageUrl(service.cover_image) || getImageUrl(service.work_images?.[0]?.image);
                const price = service.hourly_rate && parseFloat(String(service.hourly_rate)) !== 0
                  ? parseFloat(String(service.hourly_rate)) : 0;
                return (
                  <PropertyCardH key={service.id || index} expertName={service.selected_service}
                    yearsExperience={service.years_of_experience} price={price} image={imageUrl || undefined}
                    className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleCardClick(service)} />
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mb-8">
          
          <p className="text-xl mb-6 opacity-90">Can't find what you're looking for? Contact us to connect with more repair professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <ButtonPrimary onClick={() => navigate("/contact")} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Contact Support
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Repair; 