import React, { FC } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { useListingForm } from "../../context/ListingFormProvider";

export interface PageAddListing8Props {}

const PageAddListing8: FC<PageAddListing8Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  return (
    <CommonLayout
      index="07"
      backtHref="/add-listing-7"
      nextHref="/add-listing-10"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Service Pricing</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Set competitive and fair pricing for your services. Consider offering weekend or package rates to attract more clients.
          </span>
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-6"></div>

        {/* FORM */}
        <div className="space-y-8">
          {/* Currency */}
          <FormItem label="Currency">
            <Select
              value={listingData.currency}
              onChange={(e) => updateListingData({ currency: e.target.value })}
            >
              <option value="USD">USD</option>
              <option value="PKR">PKR</option>
              <option value="EUR">EUR</option>
            </Select>
          </FormItem>

          {/* Hourly Rate */}
          <FormItem label="Hourly Rate">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input 
                className="!pl-8 !pr-10" 
                placeholder="0.00" 
                type="number"
                value={listingData.hourlyRate || ''}
                onChange={(e) => updateListingData({ hourlyRate: parseFloat(e.target.value) || 0 })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">per hour</span>
              </div>
            </div>
          </FormItem>

          {/* Weekend Rate */}
          <FormItem label="Weekend Rate (Optional)">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input 
                className="!pl-8 !pr-10" 
                placeholder="0.00" 
                type="number"
                value={listingData.weekendRate || ''}
                onChange={(e) => updateListingData({ weekendRate: parseFloat(e.target.value) || 0 })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">per hour</span>
              </div>
            </div>
          </FormItem>

          {/* Package Discount */}
          <FormItem label="Bulk Booking Discount">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
              <Input 
                className="!pl-8 !pr-10" 
                placeholder="0.00" 
                type="number"
                value={listingData.bulkDiscount || ''}
                onChange={(e) => updateListingData({ bulkDiscount: parseFloat(e.target.value) || 0 })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">for 5+ hours</span>
              </div>
            </div>
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing8;
