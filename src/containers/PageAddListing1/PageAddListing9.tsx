import React, { FC } from "react";
import CommonLayout from "./CommonLayout";
import { useListingForm } from "../../context/ListingFormProvider";

const PageAddListing9: FC = () => {
  const { listingData, updateListingData } = useListingForm();

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const start = 10 * 60;
    const end = 21 * 60;
    for (let i = start; i <= end; i += 30) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const suffix = hours >= 12 ? "PM" : "AM";
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;
      const formatted = `${displayHour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${suffix}`;
      slots.push(formatted);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSlotClick = (slot: string) => {
    const isSelected = listingData.timeSlots?.includes(slot);
    const updatedSlots = isSelected
      ? listingData.timeSlots?.filter((s) => s !== slot)
      : [...(listingData.timeSlots || []), slot];
    updateListingData({ timeSlots: updatedSlots });
  };

  return (
    <CommonLayout index="08" backtHref="/add-listing-8" nextHref="/add-listing-10">
      <>
        <div className="flex items-center mb-4">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="text-lg font-medium text-neutral-600 dark:text-neutral-300">Slots</span>
        </div>

        <div className="flex flex-wrap gap-4">
          {timeSlots.map((slot) => {
            const isSelected = listingData.timeSlots?.includes(slot);
            return (
              <button
                key={slot}
                onClick={() => handleSlotClick(slot)}
                className={`px-8 py-3 rounded-xl border text-lg font-semibold focus:outline-none transition-all duration-150 ${
                  isSelected
                    ? "bg-blue-100 border-blue-400 text-blue-700 shadow"
                    : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing9;
