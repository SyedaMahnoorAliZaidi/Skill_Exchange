import axios from "axios";

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
});

// ✅ Fixed: Request interceptor to add auth token (correct key used)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // ⬅️ Corrected from "access_token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Types for API responses
export interface ListingSubmissionResponse {
  id: string;
  message: string;
  status: "success" | "error";
  listing_id?: string;
}

export interface ListingFormData {
  selectedService: string;
  specificServices: string[];
  city: string;
  latitude: number;
  longitude: number;
  expertiseLevel: string;
  yearsOfExperience: number;
  clientPresent: string;
  useTools: string;
  trialSession: string;
  lateArrival: string;
  sameDayCancel: string;
  rescheduling: string;
  partialPayment: string;
  inspection: string;
  description: string;
  coverImage: File | null;
  workImages: File[];
  currency: string;
  hourlyRate: number;
  weekendRate: number;
  bulkDiscount: number;
  timeSlots: string[];
}

// Submit complete listing form
export const submitListing = async (
  listingData: ListingFormData
): Promise<ListingSubmissionResponse> => {
  try {
    const formData = new FormData();

    formData.append("selected_service", listingData.selectedService);
    formData.append("specific_services", JSON.stringify(listingData.specificServices));
    formData.append("city", listingData.city);
    formData.append("latitude", listingData.latitude.toString());
    formData.append("longitude", listingData.longitude.toString());
    formData.append("expertise_level", listingData.expertiseLevel);
    formData.append("years_of_experience", listingData.yearsOfExperience.toString());
    formData.append("client_present", listingData.clientPresent);
    formData.append("use_tools", listingData.useTools);
    formData.append("trial_session", listingData.trialSession);
    formData.append("late_arrival", listingData.lateArrival);
    formData.append("same_day_cancel", listingData.sameDayCancel);
    formData.append("rescheduling", listingData.rescheduling);
    formData.append("partial_payment", listingData.partialPayment);
    formData.append("inspection", listingData.inspection);
    formData.append("description", listingData.description);
    formData.append("currency", listingData.currency);
    formData.append("hourly_rate", listingData.hourlyRate.toString());
    formData.append("weekend_rate", listingData.weekendRate.toString());
    formData.append("bulk_discount", listingData.bulkDiscount.toString());
    formData.append("time_slots", JSON.stringify(listingData.timeSlots));

    if (listingData.coverImage) {
      formData.append("cover_image", listingData.coverImage);
      console.log("✅ Cover image added:", listingData.coverImage.name, "Size:", listingData.coverImage.size);
    } else {
      console.log("❌ No cover image selected");
    }

    if (listingData.workImages.length > 0) {
      listingData.workImages.forEach((image, index) => {
        formData.append("work_images", image);
        console.log(`✅ Work image ${index + 1} added:`, image.name, "Size:", image.size);
      });
      console.log(`📸 Total work images: ${listingData.workImages.length}`);
    } else {
      console.log("❌ No work images selected");
    }

    console.log("📋 FormData contents:");
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    });

    const response = await apiClient.post("/services/add/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to submit listing");
  }
};

export const getUserListings = async () => {
  try {
   // const response = await apiClient.get("/listings/my-listings/");
  //  return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch listings");
  }
};

// New function to get user services
export const getUserServices = async () => {
  try {
    const response = await apiClient.get("/services/my-services/");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user services");
  }
};

// export const getUserListingsByEmail = async (userEmail: string) => {
//   try {
//     const response = await apiClient.get(`/listings/user-listings/${userEmail}/`);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Failed to fetch listings");
//   }
// };

export const deleteListingByEmail = async (userEmail: string, serviceDetails: {
  selected_service: string;
  city: string;
  description: string;
}) => {
  try {
    const response = await apiClient.delete("/listings/delete-by-email/", {
      data: {
        user_email: userEmail,
        selected_service: serviceDetails.selected_service,
        city: serviceDetails.city,
        description: serviceDetails.description,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete listing");
  }
};

export const getListingById = async (listingId: string) => {
  try {
    const response = await apiClient.get(`/listings/${listingId}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch listing");
  }
};

export const deleteListing = async (listingId: string) => {
  try {
    const response = await apiClient.delete(`/listings/${listingId}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete listing");
  }
};

// New function to delete service by service_id
export const deleteService = async (serviceId: string) => {
  try {
    const response = await apiClient.delete(`/delete-service/?service_id=${serviceId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete service");
  }
};

export const searchListings = async (params: {
  service?: string;
  city?: string;
  minRate?: number;
  maxRate?: number;
  expertiseLevel?: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    const response = await apiClient.get("/listings/search/", { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to search listings");
  }
};

export const getAvailableServices = async () => {
  try {
    const response = await apiClient.get("/listings/services/");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch services");
  }
};

export const getCities = async () => {
  try {
    const response = await apiClient.get("/listings/cities/");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch cities");
  }
};

const listingApi = {
  submitListing,
  getUserListings,
  getUserServices,
  // getUserListingsByEmail,
  deleteListingByEmail,
  getListingById,
  deleteListing,
  deleteService,
  searchListings,
  getAvailableServices,
  getCities,
};

export default listingApi;
