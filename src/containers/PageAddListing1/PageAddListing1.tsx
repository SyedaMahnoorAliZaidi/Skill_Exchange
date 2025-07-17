import React, { FC } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import AdminHeader from "components/Header/AdminHeader";
import { useListingForm } from "../../context/ListingFormProvider";

export interface PageAddListing1Props {}

const serviceOptionsMap: Record<string, string[]> = {
  Stitching: [
    "Trouser", "Shirt", "Coat", "Frock", "Skirt", "Saree Blouse",
    "Waistcoat", "Jacket", "Gown", "Kameez"
  ],
  Plumbing: [
    "Tap Fixing", "Pipe Installation", "Drain Cleaning", "Leak Detection", "Bathroom Fitting",
    "Geyser Installation", "Water Tank Cleaning", "Toilet Repair", "Water Pump Repair", "Sewer Line Repair"
  ],
  Electrical: [
    "Wiring", "Switch Repair", "Fan Installation", "Inverter Setup", "Lighting Fixture",
    "Circuit Breaker Fix", "Solar Panel Setup", "Socket Installation", "Power Backup", "Home Automation"
  ],
  Carpentry: [
    "Door Repair", "Cabinet Making", "Furniture Polishing", "Wooden Flooring", "Window Frames",
    "Wall Shelves", "Bed Repair", "Wood Carving", "Closet Installation", "False Ceiling"
  ],
  Cleaning: [
    "Window Cleaning", "Carpet Cleaning", "Deep Cleaning", "Kitchen Cleaning", "Sofa Cleaning",
    "Bathroom Cleaning", "Office Cleaning", "Mattress Cleaning", "Balcony Cleaning", "Post-Renovation Cleaning"
  ],
  Gardening: [
    "Lawn Mowing", "Planting", "Trimming", "Hedge Cutting", "Tree Pruning",
    "Weed Removal", "Soil Preparation", "Fertilizing", "Sprinkler Setup", "Vertical Gardening"
  ],
  Painting: [
    "Wall Painting", "Furniture Painting", "Texture Coating", "Ceiling Painting", "Metal Painting",
    "Primer Coating", "Spray Painting", "Artistic Murals", "Polish Work", "Repainting"
  ],
  Moving: [
    "Packing", "Loading", "Unloading", "Furniture Dismantling", "Labeling",
    "Truck Arrangement", "Unpacking", "Heavy Lifting", "Storage Arrangement", "Move-In Cleaning"
  ],
  Repair: [
    "Appliance Repair", "Furniture Repair", "Electronic Repair", "Screen Replacement", "Water Heater Fix",
    "Air Conditioner Repair", "Washing Machine Repair", "Refrigerator Repair", "Gadget Repair", "Microwave Fix"
  ],
  Installation: [
    "TV Mounting", "AC Installation", "Light Fixture Setup", "Curtain Rod Fixing", "Fan Installation",
    "Dishwasher Setup", "Washing Machine Installation", "Gas Line Setup", "Wi-Fi Router Setup", "Smart Lock Setup"
  ],
  Maintenance: [
    "General Maintenance", "Monthly Checkups", "Emergency Fixes", "System Audits", "Safety Inspections",
    "Pest Control", "Roof Maintenance", "Gutter Cleaning", "Preventive Maintenance", "Battery Replacement"
  ],
};

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const { listingData, updateListingData } = useListingForm();

  const handleServiceChange = (service: string) => {
    updateListingData({
      selectedService: service,
      specificServices: [] // Reset specific services when service changes
    });
  };

  const handleCheckboxChange = (option: string) => {
    const isSelected = listingData.specificServices.includes(option);
    const updatedServices = isSelected
      ? listingData.specificServices.filter((o) => o !== option)
      : [...listingData.specificServices, option];
    
    updateListingData({ specificServices: updatedServices });
  };

  return (
    <>
      <AdminHeader />
      <CommonLayout
        index="01"
        backtHref="/add-listing-1"
        nextHref="/add-listing-2"
      >
        <>
          <h2 className="text-2xl font-semibold">Choosing service category</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

          {/* FORM */}
          <div className="space-y-8">
            {/* Service Selection */}
            <FormItem
              label="Choose a service"
              desc="Select the type of service you want to offer."
            >
              <Select
                value={listingData.selectedService}
                onChange={(e) => handleServiceChange(e.target.value)}
              >
                <option value="">Select service</option>
                {Object.keys(serviceOptionsMap).map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Select>
            </FormItem>

            {/* Specific Options */}
            {listingData.selectedService && serviceOptionsMap[listingData.selectedService] && (
              <FormItem
                label="Specific Services"
                desc={`Choose the specific ${listingData.selectedService.toLowerCase()} tasks you provide.`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {serviceOptionsMap[listingData.selectedService].map((option) => (
                    <label key={option} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        value={option}
                        checked={listingData.specificServices.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="accent-primary-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </FormItem>
            )}
          </div>
        </>
      </CommonLayout>
    </>
  );
};

export default PageAddListing1;
