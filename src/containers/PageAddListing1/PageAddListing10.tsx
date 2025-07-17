import React, { FC } from "react";
import CommonLayout from "./CommonLayout";
import { useListingForm } from "../../context/ListingFormProvider";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const PageAddListing10: FC = () => {
  const { listingData, submitListing, isSubmitting, submitError } = useListingForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await submitListing();
      // Navigate to home page after successful submission
      navigate('/adminHomepage');
    } catch (error) {
      // Error is already handled in the context
      console.error('Submission failed:', error);
    }
  };

  const getCoverPreview = () => {
    if (listingData.coverImage) {
      return URL.createObjectURL(listingData.coverImage);
    }
    return null;
  };

  const getWorkImagePreviews = () => {
    return listingData.workImages.map((file) => URL.createObjectURL(file));
  };

  return (
    <CommonLayout 
      nextBtnText="Continue" 
      index="09" 
      backtHref="/add-listing-9" 
      nextHref="/"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Excellent, congratulations on completing your service! Your service is now ready to be published. Review the details below and click "Publish" to make it live.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-6"></div>

        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">Error: {submitError}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div><strong>Service:</strong> {listingData.selectedService}</div>
          <div><strong>Specific Services:</strong> {listingData.specificServices.join(", ")}</div>
          <div><strong>City:</strong> {listingData.city}</div>
          <div><strong>Location:</strong> {listingData.latitude}, {listingData.longitude}</div>
          <div><strong>Expertise Level:</strong> {listingData.expertiseLevel}</div>
          <div><strong>Years of Experience:</strong> {listingData.yearsOfExperience}</div>
          <div><strong>Currency:</strong> {listingData.currency}</div>
          <div><strong>Hourly Rate:</strong> {listingData.hourlyRate}</div>
          <div><strong>Weekend Rate:</strong> {listingData.weekendRate}</div>
          <div><strong>Bulk Discount:</strong> {listingData.bulkDiscount}%</div>
          <div><strong>Selected Time Slots:</strong> {listingData.timeSlots?.join(", ")}</div>
          <div><strong>Description:</strong> {listingData.description}</div>
          
          {/* Image Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Images</h3>
            
            {/* Cover Image */}
            {listingData.coverImage && (
              <div className="mb-4">
                <div className="font-medium text-sm text-gray-600 mb-2">Cover Image:</div>
                <div className="flex items-center space-x-2">
                  <img 
                    src={getCoverPreview()!} 
                    alt="Cover" 
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <span className="text-sm text-gray-500">{listingData.coverImage.name}</span>
                </div>
              </div>
            )}
            
            {/* Work Images */}
            {listingData.workImages.length > 0 && (
              <div>
                <div className="font-medium text-sm text-gray-600 mb-2">
                  Work Images ({listingData.workImages.length} selected):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {getWorkImagePreviews().map((src, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={src} 
                        alt={`Work ${index + 1}`} 
                        className="w-full h-20 object-cover rounded-lg border"
                      />
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        {listingData.workImages[index].name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!listingData.coverImage && listingData.workImages.length === 0 && (
              <div className="text-gray-500 text-sm">No images selected</div>
            )}
          </div>
        </div>

        {/* Custom submit button */}
        <div className="flex justify-center">
          <ButtonPrimary 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3"
          >
            {isSubmitting ? "Publishing..." : "Publish Listing"}
          </ButtonPrimary>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing10;
