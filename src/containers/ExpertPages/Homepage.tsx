import React, { useEffect, useState } from "react";
import AdminHeader from "components/Header/AdminHeader";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionDowloadApp from "../LandingPage/ExpertsaclickawayUI";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import ExpertServices from "containers/LandingPage/exertServicesOffered";
import HeaderFilter from "../LandingPage/HeaderFilter";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import rightImgPng from "images/our-features-2.png";
import HIW1img from "images/HIW2-1.png";
import HIW2img from "images/HIW2-2.png";
import HIW3img from "images/HIW2-3.png";
import HIW1imgDark from "images/HIW2-1-dark.png";
import HIW2imgDark from "images/HIW2-2-dark.png";
import HIW3imgDark from "images/HIW2-3-dark.png";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "shared/Footer/Footer";


function PageHome2() {
  // Custom theme class
  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) $body.classList.add("theme-cyan-blueGrey");
    return () => {
      if ($body) $body.classList.remove("theme-cyan-blueGrey");
    };
  }, []);

  const { user } = useAuth();
  const [services, setServices] = useState<any[]>([]);
  const location = useLocation();
  const { service } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/my-services/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ SERVICES FROM API: ", res.data);
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  const getImageUrl = (path?: string) =>  
    path?.startsWith("/") ? `http://localhost:8000${path}` : path;

  const handleCardClick = (service: any) => {
    navigate("/expert-service-detail", { state: { service } });
  };

  return (
    <>
      <AdminHeader />

      <div className="nc-PageHome2 relative overflow-hidden">
        <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
          {/* HERO SECTION */}
          <div className="relative py-16">
            <section
              className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl shadow-xl px-8 py-16 md:py-32 md:px-24"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 60%,rgb(15, 176, 225) 100%)",
                boxShadow: "0 10px 32px 0 rgba(15, 130, 193, 0.94)",
                width: "100%",
                minHeight: "480px",
              }}
            >
              <div className="flex-1 mb-10 md:mb-0 md:mr-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
                  Welcome to Task Ease
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Discover, connect, and exchange skills with experts in your
                  area. Find the perfect service or offer your expertise to the
                  world—all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ButtonPrimary
                    onClick={() =>
                      (window.location.href = "/add-listing-1")
                    }
                  >
                    Add Service
                  </ButtonPrimary>
                  <ButtonPrimary
                    onClick={() =>
                      (window.location.href = "/delete-service")
                    }
                  >
                    Manage Services
                  </ButtonPrimary>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="https://masterkarigar.pk/wp-content/uploads/2023/08/Home-Cleaning-Services-in-Lahore-1024x832.webp"
                  alt="Offer a Service"
                  className="rounded-2xl shadow-lg w-full max-w-xs md:max-w-sm border-4 border-teal-100"
                />
              </div>
            </section>
          </div>

          {/* USER SERVICES SECTION */}
          <div className="nc-SectionGridFeatureProperty relative py-8">
            <HeaderFilter
              subHeading="Popular services you offer in this area"
              heading="Your Expert Services Offered"
              onClickTab={() => {}}
            />
            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2">
              {services.map((service, index) => (
                <PropertyCardH
                  key={service.id || index}
                  className="h-full"
                  expertName={service.selected_service}
                  yearsExperience={service.years_of_experience || 0}
                  price={
                    parseFloat(service.hourly_rate) !== 0
                      ? parseFloat(service.hourly_rate)
                      : parseFloat(service.price) || 0
                  }
                  image={
                    getImageUrl(service.cover_image) ||
                    getImageUrl(service.work_images?.[0]?.image)
                  }
                  onClick={() => handleCardClick(service)}
                />
              ))}
            </div>
            <div className="flex mt-16 justify-center items-center space-x-6">
              <ButtonPrimary
                onClick={() => (window.location.href = "/add-listing-1")}
              >
                Add Service
              </ButtonPrimary>
              <ButtonPrimary
                onClick={() => (window.location.href = "/delete-service")}
              >
                Delete Service
              </ButtonPrimary>
            </div>
          </div>

          {/* HOW IT WORKS */}
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

          {/* EXPERT SERVICES */}
          {/* <div className="relative py-16">
            {/* <BackgroundSection /> */}
            {/* <ExpertServices /> */}
          {/* </div> */} 

          {/* FEATURES */}
          <SectionOurFeatures type="type2" rightImg={rightImgPng} />

          {/* DOWNLOAD APP */}
          <SectionDowloadApp />

          

          <SectionSliderNewCategories
            heading="Explore by types of services"
            subHeading="Explore services based on 10 types of services"
            categoryCardType="card5"
            itemPerRow={5}
            uniqueClassName="PageHome2_s2"
          />

          <SectionSubscribe2 />
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageHome2;
