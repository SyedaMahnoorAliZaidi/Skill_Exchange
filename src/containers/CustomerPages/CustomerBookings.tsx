import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCustomerBookings } from "../../api/booking";
import Header3 from "components/Header/Header3";
import Footer from "shared/Footer/Footer";

interface Booking {
  service_category: string;
  price: number;
  time: string;
  date: string;
  status: 'pending' | 'confirm' | 'reject';
  expert_name: string;
}

const CustomerBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getCustomerBookings();
      console.log("✅ Raw customer bookings data:", data);
  
      const mapped = data.map((item: any, index: number) => {
        console.log(`👉 Customer Booking #${index}:`, item);
        
        return {
          service_category: item.service_category ?? "N/A",
          price: item.price ?? 0,
          time: item.time ?? "",
          date: item.date ?? "",
          status: item.status ?? "pending",
          expert_name: item.expert_name ?? "N/A",
        };
      });
  
      console.log("✅ Mapped customer bookings:", mapped);
      setBookings(mapped);
    } catch (error) {
      console.error("❌ Error fetching customer bookings:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return "Not scheduled";
    try {
      return new Date(dateTime).toLocaleString();
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusBadge = (status: unknown) => {
    if (typeof status !== 'string' || !status) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full border bg-gray-100 text-gray-800">
          Pending
        </span>
      );
    }

    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirm: "bg-green-100 text-green-800 border-green-200",
      reject: "bg-red-100 text-red-800 border-red-200"
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };



  return (
    <>
      <Header3 />

      <div className="nc-SectionGridFeatureProperty relative py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View all your service bookings and their current status
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-6000"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expert Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4">{booking.expert_name}</td>
                          <td className="px-6 py-4">{booking.service_category}</td>
                          <td className="px-6 py-4">${booking.price}</td>
                          <td className="px-6 py-4">{booking.time ? formatDateTime(booking.time) : formatDateTime(booking.date)}</td>
                          <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add spacing before footer */}
      <div className="py-64"></div>

      <Footer />
    </>
  );
};

export default CustomerBookings; 