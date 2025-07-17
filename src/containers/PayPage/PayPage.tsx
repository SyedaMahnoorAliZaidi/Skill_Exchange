import StartRating from "components/StartRating/StartRating";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { useLocation } from "react-router-dom";

export interface PayPageProps {
  className?: string;
}

const PayPage: FC<PayPageProps> = ({ className = "" }) => {
  const location = useLocation();
  const service = location.state?.service;
  const bookingData = location.state?.bookingData;
  const fromServiceDetail = location.state?.fromServiceDetail;

  // Helper function to build full image URL
  const getImageUrl = (path?: string) => {
    if (!path) return "https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    
    // If it's already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // If it's a base64 string, return as is
    if (path.startsWith('data:image/')) {
      return path;
    }
    
    // Build full URL for relative paths
    return path.startsWith("/") ? `http://localhost:8000${path}` : path;
  };

  const renderContent = () => {
    // Generate booking code
    const bookingCode = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Booking Confirmed! 🎉
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Service Booking Section */}
        {fromServiceDetail && bookingData ? (
          <>
            {/* Service Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Service Details</h3>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 w-full sm:w-40">
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                    <NcImage 
                      src={getImageUrl(bookingData.service.cover_image)} 
                      alt={bookingData.service.name || "Service"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="pt-5 sm:pb-5 sm:px-5 space-y-3">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {bookingData.service.name} in {bookingData.service.city}
                    </span>
                    <span className="text-base sm:text-lg font-medium mt-1 block">
                      {bookingData.service.description?.substring(0, 100)}...
                    </span>
                  </div>
                  <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                    Expert: {bookingData.service.expert_name}
                  </span>
                  <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
                  <div className="text-lg font-semibold text-blue-600">
                    {bookingData.service.currency} {bookingData.service.hourly_rate} per hour
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Booking Details</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Booking Code</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingCode}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Service</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.service.name}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Selected Time</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.booking.selected_slot}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Booking Date</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.booking.booking_date}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Status</span>
                  <span className="flex-1 font-medium text-green-600">
                    {bookingData.booking.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Customer Information</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Name</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.user.full_name || 'Not provided'}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Email</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.user.email || 'Not provided'}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Phone</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.user.phone || 'Not provided'}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Address</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    {bookingData.user.address || 'Not provided'}
                  </span>
                </div>
              </div>
            </div>

            {/* Expert Information */}
            {bookingData.expert && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Expert Information</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex text-neutral-6000 dark:text-neutral-300">
                    <span className="flex-1">Expert Name</span>
                    <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                      {bookingData.expert.full_name}
                    </span>
                  </div>
                  {bookingData.expert.email && (
                    <div className="flex text-neutral-6000 dark:text-neutral-300">
                      <span className="flex-1">Expert Email</span>
                      <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                        {bookingData.expert.email}
                      </span>
                    </div>
                  )}
                  {bookingData.expert.phone && (
                    <div className="flex text-neutral-6000 dark:text-neutral-300">
                      <span className="flex-1">Expert Phone</span>
                      <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                        {bookingData.expert.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          // Original content for non-service bookings
          <>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Your booking</h3>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 w-full sm:w-40">
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                    <NcImage src={service?.featuredImage || "https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} />
                  </div>
                </div>
                <div className="pt-5 sm:pb-5 sm:px-5 space-y-3">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {service?.listingCategory?.name || "Service"} in {service?.address || "-"}
                    </span>
                    <span className="text-base sm:text-lg font-medium mt-1 block">
                      {service?.title || "-"}
                    </span>
                  </div>
                  <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                    {service?.bedrooms} beds · {service?.bathrooms} baths
                  </span>
                  <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
                  <StartRating point={service?.reviewStart} reviewCount={service?.reviewCount} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Booking detail</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Booking code</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    #222-333-111
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Date</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    12 Aug, 2021
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Total</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    $199
                  </span>
                </div>
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment method</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    Credit card
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <ButtonPrimary href="/customer-home">Explore more services</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayPage;
