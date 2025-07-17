import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";
console.log("✅ API BASE URL:", API_BASE_URL);

const apiClient = axios.create({ baseURL: API_BASE_URL });

export const getExpertAssignedServices = async () => {
  const token = localStorage.getItem("accessToken");
  console.log("✅ Fetch assigned services - token:", token);
  
  const response = await apiClient.get(`/expert/assigned-services/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateBookingStatus = async (bookingId: number, status: 'confirm' | 'reject') => {
  const token = localStorage.getItem("accessToken");
  const payload = { booking_id: bookingId, status };
  console.log("✅ Sending PATCH to /expert/update-booking-status/ with:", payload);

  try {
    const response = await apiClient.patch(
      `/expert/update-booking-status/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("❌ API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    if (error.response?.data) {
      console.error("❌ Backend Error Response:", error.response.data);
    }
    
    throw error;
  }
};

export const getCustomerBookings = async () => {
  const token = localStorage.getItem("accessToken");
  console.log("✅ Fetch customer booked services - token:", token);
  
  const response = await apiClient.get(`/customer-booked-services/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getMLRecommendedServices = async () => {
  const token = localStorage.getItem("accessToken");
  console.log("✅ Fetch ML recommended services - token:", !!token);
  
  try {
    const response = await apiClient.get(`/recommend-experts/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ ML API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ ML API Error:", error);
    throw error;
  }
};
