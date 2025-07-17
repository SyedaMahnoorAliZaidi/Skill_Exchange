import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getExpertAssignedServices } from "../../api/booking";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import HeaderFilter from "../LandingPage/HeaderFilter";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Header3 from "components/Header/Header3";
import Footer from "shared/Footer/Footer";
import AdminHeader from "components/Header/AdminHeader";

const Booking: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const apple="jdijdsidj";

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    getExpertAssignedServices()
      .then(setBookings)
      .finally(() => setLoading(false));
  }, [user?.email]);

  return (
    <>
      <AdminHeader/>
    
    
    <div className="nc-SectionGridFeatureProperty relative py-8">
      <HeaderFilter
        subHeading="All your bookings"
        heading="Bookings"
        onClickTab={() => {}}
      />
      {loading && <div>Loading...</div>}
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
        {bookings.map((booking, idx) => (
          <PropertyCardH
            key={booking.id || idx}
            className="h-full"
            expertName={booking.expert_name || booking.name || "Expert"}
            yearsExperience={booking.years_experience || booking.yearsExperience || 0}
            price={booking.price || 0}
          />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center space-x-6">
        <ButtonPrimary onClick={() => window.location.href = "/add-listing-1"}>
          Add Service
        </ButtonPrimary>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Booking;
