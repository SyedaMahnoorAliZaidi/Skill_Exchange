import React, { FC } from "react";
import CommonLayout from "./CommonLayout";
import { useListingForm, ListingFormData } from "../../context/ListingFormProvider";

export interface PageAddListing5Props {}

const PageAddListing5: FC<PageAddListing5Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  const renderRadio = (
    name: string,
    id: string,
    label: string,
    value: string,
    currentValue: string
  ) => {
    return (
      <div className="flex items-center">
        <input
          checked={currentValue === value}
          id={id + name}
          name={name}
          type="radio"
          value={value}
          onChange={(e) => updateListingData({ [name]: e.target.value })}
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  const renderAttributeGroup = (title: string, name: keyof Pick<ListingFormData, 'clientPresent' | 'useTools' | 'trialSession' | 'lateArrival' | 'sameDayCancel' | 'rescheduling' | 'partialPayment' | 'inspection'>) => (
    <div>
      <label className="text-lg font-semibold">{title}</label>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {renderRadio(name, "DoNotAllow", "Do not allow", "DoNotAllow", listingData[name])}
        {renderRadio(name, "Allow", "Allow", "Allow", listingData[name])}
        
      </div>
    </div>
  );

  const renderRuleTag = (text: string) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {text}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
      </div>
    );
  };

  return (
    <CommonLayout index="04" backtHref="/add-listing-3" nextHref="/add-listing-6">
      <>
        <div>
          <h2 className="text-2xl font-semibold">Set service attributes</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Define policies and options for the selected skill/service.
          </span>
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        <div className="space-y-8">
          {/* Service-related Attributes */}
          {renderAttributeGroup("Client allowed during service", "clientPresent")}
          {renderAttributeGroup("Use of expert's tools", "useTools")}
          {renderAttributeGroup("Trial/demo session", "trialSession")}
          {renderAttributeGroup("Late arrival tolerance", "lateArrival")}
          {renderAttributeGroup("Same-day cancellations", "sameDayCancel")}
          {renderAttributeGroup("Rescheduling option", "rescheduling")}
          {renderAttributeGroup("Partial payments", "partialPayment")}
          {renderAttributeGroup("Post-service inspection", "inspection")}
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing5;
