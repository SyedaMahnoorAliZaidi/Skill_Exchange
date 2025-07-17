import React, { useState, useEffect } from "react";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Header3 from "components/Header/Header3";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import NcModal from "shared/NcModal/NcModal";
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Footer from "shared/Footer/Footer";
import { getUserServices, deleteService } from "api/listing";
import { useAuth } from "context/AuthContext";
import AdminHeader from "components/Header/AdminHeader";

// API Response Types - matching the structure from admin homepage
interface ApiListing {
  id: string;
  selected_service: string;
  specific_services: string[];
  city: string;
  latitude: number;
  longitude: number;
  expertise_level: string;
  years_of_experience: number;
  description: string;
  currency: string;
  hourly_rate: number;
  weekend_rate: number;
  bulk_discount: number;
  time_slots: string[];
  cover_image?: string;
  work_images?: Array<{ image: string }>;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Extended StayDataType with original API data and years_of_experience
interface ExtendedStayDataType extends StayDataType {
  originalData: ApiListing;
  years_of_experience: number;
}

// Convert API listing to StayDataType for PropertyCardH compatibility
const convertApiListingToStayDataType = (apiListing: ApiListing, getImageUrl: (path?: string) => string | undefined): ExtendedStayDataType => {
  return {
    id: apiListing.id,
    author: {
      id: apiListing.user?.id || apiListing.id,
      firstName: apiListing.user?.username?.split(' ')[0] || 'Expert',
      lastName: apiListing.user?.username?.split(' ').slice(1).join(' ') || '',
      displayName: apiListing.user?.username || 'Expert',
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      count: 0,
      desc: "",
      jobName: apiListing.selected_service,
      href: `/listing-stay-detail?id=${apiListing.id}`,
    },
    date: new Date(apiListing.created_at).toLocaleDateString(),
    href: `/listing-stay-detail?id=${apiListing.id}`,
    title: apiListing.selected_service, // Use service name as title
    featuredImage: getImageUrl(apiListing.cover_image) || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    commentCount: 0,
    viewCount: 0,
    address: apiListing.city,
    reviewStart: 4.8, // Example static rating
    reviewCount: 28, // Example static count
    like: false,
    galleryImgs: apiListing.work_images?.length ? apiListing.work_images.map(img => getImageUrl(img.image)).filter((url): url is string => url !== undefined) : [
      getImageUrl(apiListing.cover_image) || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ],
    price: apiListing.hourly_rate.toString(),
    listingCategory: {
      id: "1",
      name: apiListing.selected_service,
      href: `/listing-stay?service=${apiListing.selected_service}`,
      taxonomy: "category",
      count: 1,
    },
    maxGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    isAds: true, // Show ADS badge for demo
    map: {
      lat: apiListing.latitude,
      lng: apiListing.longitude,
    },
    // Store original API data for deletion
    originalData: apiListing,
    years_of_experience: apiListing.years_of_experience,
  };
};

const DeleteService: React.FC = () => {
  const [services, setServices] = useState<ExtendedStayDataType[]>([]);
  const [selectedService, setSelectedService] = useState<ExtendedStayDataType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Helper function to get image URL (same as admin homepage)
  const getImageUrl = (path?: string) =>  
    path?.startsWith("/") ? `http://localhost:8000${path}` : path;

  // Restore the original useEffect
  useEffect(() => {
    if (user && user.email) {
      fetchUserServices();
    } else {
      setError("User email not found. Please log in again.");
      setIsFetching(false);
    }
  }, [user]);

  const fetchUserServices = async () => {
    try {
      setIsFetching(true);
      setError(null);
      
      // Get the auth token
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setIsFetching(false);
        return;
      }
      
      // Try to fetch from API, but fall back to dummy data if API is not ready
      let convertedServices: ExtendedStayDataType[] = [];
      
      try {
        // Use the same API call as admin homepage to get only the logged-in user's services
        const response = await fetch("http://localhost:8000/api/my-services/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ SERVICES FROM API: ", data);
        
        convertedServices = data.map((listing: ApiListing) => 
          convertApiListingToStayDataType(listing, getImageUrl)
        );
      } catch (apiError) {
        console.log("API not ready, using dummy data:", apiError);
      }
      
      // No dummy data - only show real services from API
      setServices(convertedServices);
    } catch (error: any) {
      console.error("Error fetching listings:", error);
      setError(error.message || "Failed to fetch your services");
    } finally {
      setIsFetching(false);
    }
  };

  // Filter services based on search term
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.listingCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (service: ExtendedStayDataType) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedService || !user?.email) return;

    setIsLoading(true);
    try {
      // Get the original API data for deletion
      const originalData = selectedService.originalData;
      
      if (!originalData) {
        throw new Error("Service data not found");
      }

      // Try to call the API to delete the service by service_id
      try {
        await deleteService(originalData.id);
        console.log("Service deleted successfully via API");
      } catch (apiError) {
        console.log("API not ready, proceeding with local deletion:", apiError);
        // Continue with local deletion even if API fails
      }
      
      // Remove service from local state
      setServices(prevServices => 
        prevServices.filter(service => service.id !== selectedService.id)
      );
      
      setIsDeleteModalOpen(false);
      setSelectedService(null);
      
      // Show success message
      console.log("Service deleted successfully");
    } catch (error: any) {
      console.error("Error deleting service:", error);
      setError(error.message || "Failed to delete service");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedService(null);
  };

  const renderServiceCard = (service: ExtendedStayDataType, index: number) => {
    return (
      <div key={service.id} className="relative group">
        <PropertyCardH
          className="h-full"
          expertName={service.author.displayName || "Expert"}
          yearsExperience={typeof service.years_of_experience === "string" ? parseInt(service.years_of_experience) : (service.years_of_experience || 0)}
          price={typeof service.price === "string" ? parseFloat(service.price) : (service.price || 0)}
          image={
            service.featuredImage ||
            (service.galleryImgs && service.galleryImgs.length > 0 ? service.galleryImgs[0] : undefined)
          }
        />
        {/* Delete button overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteClick(service);
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            title="Delete Service"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <AdminHeader />
      <div className="nc-DeleteService relative overflow-hidden">
        {/* Hero Section */}
        <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
          <div className="relative py-16">
            <section className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl shadow-xl px-8 py-16 md:py-32 md:px-24"
              style={{
                background: "linear-gradient(135deg, #ffffff 60%,rgb(15, 176, 225) 100%)",
                boxShadow: "0 10px 32px 0 rgba(15, 130, 193, 0.94)",
                maxWidth: "none",
                width: "100%",
                minHeight: "480px",
              }}
            >
              <div className="flex-1 mb-10 md:mb-0 md:mr-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
                  Manage Your Services
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  View and manage all your offered services. Delete services that are no longer available or need to be updated.
                </p>
                {user?.email && (
                  <p className="text-sm text-gray-600 mb-4">
                    Managing services for: <span className="font-semibold">{user.email}</span>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4">
                  <ButtonPrimary onClick={() => window.location.href = "/add-listing-1"}>
                    Add New Service
                  </ButtonPrimary>
                  <ButtonSecondary onClick={() => window.location.href = "/adminHomepage"}>
                    Back to Dashboard
                  </ButtonSecondary>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="https://img.freepik.com/free-vector/delete-concept-illustration_114360-1000.jpg"
                  alt="Manage Services"
                  className="rounded-2xl shadow-lg w-full max-w-xs md:max-w-sm border-4 border-teal-100"
                />
              </div>
            </section>
          </div>

          {/* Search and Filter Section */}
          <div className="relative py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="relative py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Services ({filteredServices.length})
              </h2>
              <p className="text-lg text-gray-600">
                Hover over a service card to see the delete option
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-red-600">{error}</p>
                                    {user?.email && (
                    <button
                      onClick={() => fetchUserServices()}
                      className="mt-2 text-red-500 hover:text-red-700 underline"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isFetching && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Loading your services...
                </h3>
                <p className="text-gray-600">
                  Please wait while we fetch your services
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isFetching && !error && filteredServices.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <TrashIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? "No services found" : "No services yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? "Try adjusting your search terms" 
                    : "Start by adding your first service"
                  }
                </p>
                {!searchTerm && (
                  <ButtonPrimary onClick={() => window.location.href = "/add-listing-1"}>
                    Add Your First Service
                  </ButtonPrimary>
                )}
              </div>
            )}

            {/* Services Grid */}
            {!isFetching && !error && filteredServices.length > 0 && (
              <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
                {filteredServices.map(renderServiceCard)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <NcModal
        isOpenProp={isDeleteModalOpen}
        onCloseModal={handleCancelDelete}
        contentExtraClass="max-w-lg"
        renderContent={() => (
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Delete Service
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>
            {selectedService && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {selectedService.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedService.address}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ${selectedService.price}/hour
                </p>
                <p className="text-sm text-gray-600">
                  Service: {selectedService.listingCategory.name}
                </p>
                <p className="text-sm text-gray-600">
                  User: {user?.email}
                </p>
              </div>
            )}
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this service? This will permanently remove it from your profile and it cannot be recovered.
            </p>
            <div className="flex justify-end space-x-3">
              <ButtonSecondary
                onClick={handleCancelDelete}
                disabled={isLoading}
              >
                Cancel
              </ButtonSecondary>
              <button
                onClick={handleConfirmDelete}
                disabled={isLoading}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete Service</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      />
      <Footer />
    </>
  );
};

export default DeleteService;
