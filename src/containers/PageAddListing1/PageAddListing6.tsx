import React, { FC } from "react";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { useListingForm } from "../../context/ListingFormProvider";

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  return (
    <CommonLayout
      index="05"
      backtHref="/add-listing-5"
      nextHref="/add-listing-7"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Description
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  Describe your service in detail, including what makes you stand out, the tools or methods you use, and any guarantees or specialties you offer. Be clear about what clients can expect.
</span>

        </div>

        <Textarea 
          placeholder="" 
          rows={14} 
          value={listingData.description}
          onChange={(e) => updateListingData({ description: e.target.value })}
        />
      </>
    </CommonLayout>
  );
};

export default PageAddListing6;
