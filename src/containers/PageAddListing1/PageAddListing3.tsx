import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC } from "react";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { useListingForm } from "../../context/ListingFormProvider";
import AdminHeader from "components/Header/AdminHeader";

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref="/add-listing-5"
    >
      <>
        
        <h2 className="text-2xl font-semibold">Skill</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem label="Expertise Level">
            <Select
              value={listingData.expertiseLevel}
              onChange={(e) => updateListingData({ expertiseLevel: e.target.value })}
            >
              <option value="">Select expertise level</option>
              <option value="Learner">Learner</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </Select>
          </FormItem>
          <NcInputNumber 
            label="Years of Experience" 
            defaultValue={listingData.yearsOfExperience}
            onChange={(value) => updateListingData({ yearsOfExperience: value })}
          />
          
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;
