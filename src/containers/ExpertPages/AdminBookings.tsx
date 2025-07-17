import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getExpertAssignedServices, updateBookingStatus } from "../../api/booking";
import AdminHeader from "components/Header/AdminHeader";
import Footer from "shared/Footer/Footer";

interface Booking {
  id: number;
  customer_name: string;
  city: string;
  date_time: string;
  amount: number;
  service_category: string;
  status: 'pending' | 'confirm' | 'reject';
  payment_status: 'pending' | 'paid' | 'failed';
}

const AdminBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getExpertAssignedServices();
      console.log("✅ Raw bookings data:", data);
  
      const mapped = data.map((item: any, index: number) => {
        console.log(`👉 Booking #${index}:`, item);
        const bookingId = item.id ?? item.booking_id ?? item.pk ?? item.ID;
        console.log(`🔢 Booking ID for #${index}:`, bookingId, `Type:`, typeof bookingId);
        
        return {
          id: bookingId,
          customer_name: item.customer_name ?? item.customer?.name ?? "N/A",
          city: item.city ?? item.customer?.city ?? "N/A",
          date_time: item.date_time,
          amount: item.amount,
          service_category: item.service_category ?? item.service?.category ?? "N/A",
          status: item.status ?? "pending",
          payment_status: item.payment_status ?? "pending",
        };
      });
  
      console.log("✅ Mapped bookings:", mapped);
      setBookings(mapped);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

      const handleStatusUpdate = async (bookingId: number, status: 'confirm' | 'reject') => {
      console.log("🔧 Updating booking status:", { bookingId, status });
      setUpdating(bookingId);
      try {
        const res = await updateBookingStatus(bookingId, status);
        console.log("✅ Status update response:", res);
        await fetchBookings(); // refresh list
      } catch (error: any) {
        console.error("❌ Error updating booking status:", error);
        
        // Show user-friendly error message
        let errorMessage = "Failed to update booking status.";
        if (error.response?.data) {
          if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data.booking_id) {
            errorMessage = `Booking ID error: ${error.response.data.booking_id.join(', ')}`;
          } else if (error.response.data.status) {
            errorMessage = `Status error: ${error.response.data.status.join(', ')}`;
          }
        }
        
        alert(errorMessage);
      } finally {
        setUpdating(null);
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

  const getPaymentStatusBadge = (paymentStatus: unknown) => {
    if (typeof paymentStatus !== 'string' || !paymentStatus) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full border bg-yellow-100 text-yellow-800 border-yellow-200">
          Pending
        </span>
      );
    }

    const paymentStatusClasses = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      paid: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200"
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${paymentStatusClasses[paymentStatus as keyof typeof paymentStatusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </span>
    );
  };

  return (
    <>
      <AdminHeader />

      <div className="nc-SectionGridFeatureProperty relative py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Manage Bookings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and manage all booking requests
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          No assigned services found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4">{booking.customer_name}</td>
                          <td className="px-6 py-4">{booking.city}</td>
                          <td className="px-6 py-4">{formatDateTime(booking.date_time)}</td>
                          <td className="px-6 py-4">${booking.amount}</td>
                          <td className="px-6 py-4">{booking.service_category}</td>
                          <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                          <td className="px-6 py-4">{getPaymentStatusBadge(booking.payment_status)}</td>
                          <td className="px-6 py-4">
                            {(booking.status === 'pending' || !booking.status) ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleStatusUpdate(booking.id, 'confirm')}
                                  disabled={updating === booking.id}
                                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updating === booking.id ? 'Updating...' : 'Approve'}
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(booking.id, 'reject')}
                                  disabled={updating === booking.id}
                                  className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updating === booking.id ? 'Updating...' : 'Reject'}
                                </button>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {booking.status === 'confirm' ? 'Approved' : 'Rejected'}
                              </span>
                            )}
                          </td>
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
      <div className="py-[48rem]"></div>

      <Footer />
    </>
  );
};

export default AdminBookings;
