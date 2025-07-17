import React, { FC, ChangeEvent } from "react";
import CommonLayout from "./CommonLayout";
import { useListingForm } from "../../context/ListingFormProvider";

export interface PageAddListing7Props {}

const PageAddListing7: FC<PageAddListing7Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateListingData({ coverImage: file });
    }
  };

  const handlePlaceImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      updateListingData({ workImages: files });
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
    <CommonLayout index="06" backtHref="/add-listing-6" nextHref="/add-listing-8">
      <>
        <div>
          <h2 className="text-2xl font-semibold">Pictures of your work</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Upload a cover image and multiple photos of your work to showcase your skills effectively.
          </span>
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-8">
          {/* Cover Image */}
          <div>
            <span className="text-lg font-semibold">Cover image</span>
            <div className="mt-5">
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-md">
                <div className="text-center w-full space-y-1">
                  <label htmlFor="cover-upload" className="cursor-pointer text-primary-6000 hover:text-primary-500">
                    <span>Upload a file</span>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleCoverImageChange}
                    />
                  </label>
                  <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
                  {getCoverPreview() && (
                    <img src={getCoverPreview()!} alt="Cover" className="mt-4 max-h-48 rounded shadow mx-auto" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Multiple Place Images */}
          <div>
            <span className="text-lg font-semibold">Place images</span>
            <div className="mt-5">
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-md">
                <div className="text-center w-full space-y-1">
                  <label htmlFor="place-upload" className="cursor-pointer text-primary-6000 hover:text-primary-500">
                    <span>Upload multiple files</span>
                    <input
                      id="place-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={handlePlaceImagesChange}
                    />
                  </label>
                  <p className="text-xs text-neutral-500">Upload up to 5 images of your work</p>

                  {getWorkImagePreviews().length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {getWorkImagePreviews().map((src, index) => (
                        <img key={index} src={src} alt={`Work ${index + 1}`} className="rounded shadow max-h-40" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing7;


//api


// const formData = new FormData();
// if (coverImage) formData.append("cover_image", coverImage);
// placeImages.forEach((img, i) => {
//   formData.append(`place_images[${i}]`, img);
// });

// // Then send with Axios or Fetch:
// await axios.post("/api/submit-service", formData, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
