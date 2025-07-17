import React, { FC, Fragment, useState } from "react";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import SectionDateRange from "../SectionDateRange";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useLocation, useNavigate } from "react-router-dom";
import { Amenities_demos, PHOTOS } from "./constant";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import GuestsInput from "./GuestsInput";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix default marker icon in Leaflet
// (do this only once per app, but safe here for this file)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const StayDetailPageContainer: FC<{}> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { service, selectedSlot: locationSelectedSlot } = location.state || {};

  if (!service) {
    return (
      <div className="container py-10">
        <h2 className="text-2xl font-semibold mb-4">No service data found.</h2>
        <p>Please select a service from the listings page.</p>
      </div>
    );
  }

  // Helper to build full URL
  const getImageUrl = (path: string) =>
    path?.startsWith("/") ? `http://localhost:8000${path}` : path;

  // Build all images: cover + work_images
  const allImages: string[] = [
    ...(service.cover_image ? [getImageUrl(service.cover_image)] : []),
    ...(Array.isArray(service.work_images)
      ? service.work_images.map((imgObj: any) => getImageUrl(imgObj.image))
      : [])
  ];

  const thisPathname = location.pathname;

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    navigate(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
  };

  const handleImageClick = (img: string) => setModalImg(img);
  const closeModal = () => setModalImg(null);

  const renderSection1 = () => {
    if (!service) return null;
    // Get expert name, service name, and city
    const expertName = service.author?.displayName || service.expert_name || '-';
    const serviceName = service.selected_service || service.listingCategory?.name || '-';
    const city = service.city || '-';
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-100">
         {/* Service Name */}
         <div className="flex items-center space-x-3 mt-5">
          {/* <i className="las la-briefcase text-3xl text-blue-500"></i> */}
          <span className="text-[50px] font-bold text-black-700">{serviceName}</span>
          
        </div>
        <br></br>
        
        
        {/* Expert Name */}
        <div className="flex items-center space-x-3 mt-2">
          <i className="las la-user text-2xl text-blue-600"></i>
          <span className="font-semibold text-lg text-gray-800">{expertName}</span>
        </div>
       
        {/* City */}
        <div className="flex items-center space-x-3 mt-1">
          <i className="las la-map-marker-alt text-2xl text-green-500"></i>
          <span className="text-lg text-gray-600">{city}</span>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    if (!service) return null;
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-0">Service Description</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>{service.description}</span>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    if (!service) return null;
    let specificServices = [];
    try {
      specificServices = typeof service.specific_services === "string"
        ? JSON.parse(service.specific_services)
        : service.specific_services || [];
    } catch {
      specificServices = [];
    }
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Specific Services</h2>
          <span className="block mt-1 mb-3 text-neutral-500 dark:text-neutral-400">
            All the specific services offered
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-blue-700 mb-4 mt-1 "></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-blue-200 md:grid-cols-3 gap-4 mt-0 mb-5 border-blue-500">
          {specificServices.map((item: string, idx: number) => (
            <div
              key={idx}
              className="px-6 py-3 rounded-xl border text-lg font-semibold bg-blue-50 border-blue-200 text-blue-700 text-center shadow"            >
              
              <span className="text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection4 = () => {
    if (!service) return null;
    // Try to get time slots from service data
    let timeSlots: string[] = [];
    if (service.originalData?.time_slots) {
      timeSlots = Array.isArray(service.originalData.time_slots)
        ? service.originalData.time_slots
        : [];
    } else if (service.time_slots) {
      timeSlots = Array.isArray(service.time_slots)
        ? service.time_slots
        : [];
    }
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50 mb-3">
        <div className="flex items-center mb-6">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="text-lg font-medium text-neutral-600 dark:text-neutral-300">Slots</span>
        </div>
           <span className="block mt-2 mb-4 text-neutral-500 dark:text-neutral-400">
            Please select a time slot 
          </span>




        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 mb-5">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot, idx) => (
              <button
                key={idx}
                className={`px-6 py-3 rounded-xl border text-lg font-semibold text-center shadow
                  ${selectedSlot === slot
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-blue-50 text-blue-700 border-blue-200"}
                `}
                onClick={() => setSelectedSlot(slot)}
                type="button"
              >
                {slot}
              </button>
            ))
          ) : (
            <span className="text-neutral-400 col-span-full">No slots available</span>
          )}
        </div>
      </div>
    );
  };

  const renderSectionMap = () => {
    if (!service) return null;
    const lat = Number(service.latitude || service.originalData?.latitude);
    const lng = Number(service.longitude || service.originalData?.longitude);
    const hasCoords = !isNaN(lat) && !isNaN(lng);
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">Location Map</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
        {hasCoords ? (
          <div className="h-72 w-full rounded-lg overflow-hidden">
            <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]} />
            </MapContainer>
          </div>
        ) : (
          <div className="text-neutral-400">No location coordinates available.</div>
        )}
      </div>
    );
  };

  type AttributeKey = 'clientPresent' | 'useTools' | 'trialSession' | 'lateArrival' | 'sameDayCancel' | 'rescheduling' | 'partialPayment' | 'inspection';
  const getAttr = (key: AttributeKey) => service[key] || service.originalData?.[key];
  const renderSectionAttributes = () => {
    if (!service) return null;
    const attributes: { key: AttributeKey; label: string }[] = [
      { key: 'clientPresent', label: "Client allowed during service" },
      { key: 'useTools', label: "Use of expert's tools" },
      { key: 'trialSession', label: "Trial/demo session" },
      { key: 'lateArrival', label: "Late arrival tolerance" },
      { key: 'sameDayCancel', label: "Same-day cancellations" },
      { key: 'rescheduling', label: "Rescheduling option" },
      { key: 'partialPayment', label: "Partial payments" },
      { key: 'inspection', label: "Post-service inspection" },
    ];
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">Service Attributes</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {attributes.map(attr => {
            const value = getAttr(attr.key);
            const allowed = value === 'Allow';
            return (
              <div
                key={attr.key}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center">
                  {allowed ? (
                    <i className="las la-check-circle text-2xl text-green-500 mr-3"></i>
                  ) : (
                    <i className="las la-times-circle text-2xl text-red-500 mr-3"></i>
                  )}
                  <span className="font-medium flex-1">{attr.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSectionWorkImages = () => {
    if (!service) return null;
    const coverImage = service.coverImage || service.featuredImage;
    const workImages = (service.workImages && service.workImages.length > 0)
      ? service.workImages
      : (service.galleryImgs && service.galleryImgs.length > 0)
        ? service.galleryImgs
        : [];
    if (!coverImage && workImages.length === 0) return null;
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">Work Images</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
        {/* Cover Image */}
        {coverImage && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <i className="las la-camera text-xl text-blue-500 mr-2"></i>
              <span className="font-semibold">Cover Image</span>
            </div>
            <img src={coverImage} alt="Cover" className="rounded shadow max-h-48 w-auto mx-auto" />
          </div>
        )}
        {/* Work Images */}
        {workImages.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <i className="las la-images text-xl text-green-500 mr-2"></i>
              <span className="font-semibold">Work Images</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {workImages.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={`Work ${idx + 1}`} className="rounded shadow max-h-40 w-auto mx-auto" />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSectionPricing = () => {
    if (!service) return null;
    const currency = service.currency;
    const hourlyRate = service.hourly_rate;
    const weekendRate = service.weekend_rate;
    const bulkDiscount = service.bulk_discount;
    if (!currency && !hourlyRate && !weekendRate && !bulkDiscount) return null;
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">Service Pricing</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {currency && (
            <div className="flex items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <i className="las la-coins text-2xl text-yellow-500 mr-3"></i>
              <span className="font-medium flex-1">Currency:</span>
              <span className="font-semibold">{currency}</span>
            </div>
          )}
          {hourlyRate && (
            <div className="flex items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <i className="las la-dollar-sign text-2xl text-green-500 mr-3"></i>
              <span className="font-medium flex-1">Hourly Rate:</span>
              <span className="font-semibold">{hourlyRate} {currency}</span>
            </div>
          )}
          {weekendRate && (
            <div className="flex items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <i className="las la-calendar-week text-2xl text-blue-500 mr-3"></i>
              <span className="font-medium flex-1">Weekend Rate:</span>
              <span className="font-semibold">{weekendRate} {currency}</span>
            </div>
          )}
          {bulkDiscount && (
            <div className="flex items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <i className="las la-percent text-2xl text-purple-500 mr-3"></i>
              <span className="font-medium flex-1">Bulk Discount:</span>
              <span className="font-semibold">{bulkDiscount}%</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    if (!service) return null;
    // Get expert name, service name, and city
    const expertName = service.author?.displayName || service.expert_name || '-';
    const serviceName = service.selected_service || service.listingCategory?.name || '-';
    const city = service.city || '-';
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-50">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold mb-2">Expertise & Experience</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>
        <div className="flex items-center space-x-8 mt-2">
          {/* Years of Experience */}
          <div className="flex items-center space-x-2">
            <i className="las la-briefcase text-3xl text-blue-500"></i>
            <span className="font-[18px]">{service.years_of_experience} years</span>
          </div>
          {/* Expertise Level */}
          <div className="flex items-center space-x-2">
            
            {/* <span className="font-medium">{service.expertise_level }</span> */}
          </div>
        </div>
        <span className="block text-xl dark:text-neutral-300 mt-4">
          {service.expertise_level}
        </span>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-100">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold mb-2">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-100">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Location</h2>
          <span className="block mt-1 text-neutral-500 dark:text-neutral-400">
            San Diego, CA, United States of America (SAN-San Diego Intl.)
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              title="x"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap !space-y-0 p-4 bg-gray-100">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold mb-2">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Check-in</span>
              <span>08:00 am - 12:00 am</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Check-out</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>
                Ban and I will work together to keep the landscape and
                environment green and clean by not littering, not using
                stimulants and respecting people around.
              </li>
              <li>Do not sing karaoke past 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (!service) return null;
    const price =
      service.hourly_rate && parseFloat(service.hourly_rate) !== 0
        ? parseFloat(service.hourly_rate)
        : service.price && parseFloat(service.price) !== 0
          ? parseFloat(service.price)
          : 0;
    const currency = service.currency || "PKR";

    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        {price > 0 && (
          <div className="mb-2 text-center text-2xl font-bold text-blue-700">
            {currency} {price.toLocaleString()}
          </div>
        )}

        {/* Selected Slot */}
        {selectedSlot && (
          <div className="mb-2 text-center text-blue-700 font-semibold">
            Selected Slot: {selectedSlot}
          </div>
        )}

        {/* Reserve Button */}
        <button
          className="w-full py-3 bg-blue-600 text-white rounded-2xl font-semibold mt-4 hover:bg-blue-700 transition"
          onClick={() => navigate('/checkout', { state: { service, selectedSlot } })}
          disabled={!selectedSlot}
        >
          Reserve
        </button>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/* Dynamic Image Gallery */}
      <div className="mb-8">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {allImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Service image ${idx + 1}`}
              className="w-full mb-4 rounded-xl shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                // Randomize minHeight for a dynamic look
                minHeight: 180 + (idx % 3) * 40,
                maxHeight: 320,
                objectFit: "cover",
                objectPosition: "center",
              }}
              onClick={() => handleImageClick(img)}
            />
          ))}
        </div>
      </div>
      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          {renderSectionMap()}
          {renderSectionAttributes()}
          {renderSectionWorkImages()}
          {renderSectionPricing()}
          {/* <SectionDateRange /> */}
          {renderSection5()}
          {/* {renderSection6()} */}
          
          
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
      <Transition appear show={!!modalImg} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-xl shadow-xl p-2 max-w-3xl w-full flex justify-center items-center">
                <img
                  src={modalImg!}
                  alt="Enlarged"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    width: "auto",
                    height: "auto",
                    display: "block",
                    margin: "0 auto"
                  }}
                  className="rounded-lg"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default function ListingStayDetailPage() {
  return (
    <DetailPagetLayout>
      <StayDetailPageContainer />
    </DetailPagetLayout>
  );
}
